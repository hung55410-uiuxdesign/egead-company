import { NextRequest, NextResponse } from 'next/server';
import { getApplicationById } from '@/lib/careers';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const application = await getApplicationById(id);

    if (!application || !application.cvUrl) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy hồ sơ hoặc CV của ứng viên' },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const isDownload =
      searchParams.get('download') === 'true' || searchParams.get('action') === 'download';

    const safeName = application.fullName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    const safeJob = (application.jobTitle || 'Vi_Tri')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    const cvUrl = application.cvUrl.trim();

    // 1. Case: Local file in /uploads/
    if (cvUrl.startsWith('/uploads/')) {
      const localFilePath = path.join(process.cwd(), 'public', cvUrl);
      try {
        const fileBuffer = await fs.readFile(localFilePath);
        const ext = path.extname(localFilePath).toLowerCase() || '.pdf';
        const contentType =
          ext === '.pdf'
            ? 'application/pdf'
            : ext === '.docx'
            ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            : ext === '.doc'
            ? 'application/msword'
            : 'application/octet-stream';

        const filename = `CV_${safeName}_${safeJob}${ext}`;
        const disposition = isDownload ? 'attachment' : 'inline';

        return new Response(fileBuffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        console.error('Lỗi đọc tệp local CV:', err);
      }
    }

    // 2. Case: Cloudinary URL
    if (cvUrl.includes('cloudinary.com')) {
      const urlMatch = cvUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\.([a-zA-Z0-9]+)$/);
      const publicId = urlMatch ? urlMatch[1] : null;
      const format = urlMatch ? urlMatch[2].toLowerCase() : 'pdf';
      const baseFilename = publicId ? path.basename(publicId) : 'file';
      const cachePath = path.join(process.cwd(), 'public', 'uploads', 'cv', `${baseFilename}.${format}`);

      // Check if already cached locally
      try {
        const cachedBuffer = await fs.readFile(cachePath);
        const disposition = isDownload ? 'attachment' : 'inline';
        const contentType = format === 'pdf' ? 'application/pdf' : 'application/octet-stream';
        const filename = `CV_${safeName}_${safeJob}.${format}`;

        return new Response(cachedBuffer, {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch {
        // Cache miss, proceed to fetch
      }

      if (publicId) {
        // 1. Try private download URL with Cloudinary API
        const privateDownloadUrl = cloudinary.utils.private_download_url(
          publicId,
          format,
          { resource_type: 'image', type: 'upload' }
        );

        // 2. Try signed delivery URL
        const signedUrl = cloudinary.url(`${publicId}.${format}`, {
          resource_type: 'image',
          secure: true,
          sign_url: true,
          type: 'upload',
        });

        // 3. Try with API authorization header
        const authHeader =
          'Basic ' +
          Buffer.from(
            `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
          ).toString('base64');

        let fetchRes = await fetch(privateDownloadUrl);
        if (!fetchRes.ok) {
          fetchRes = await fetch(signedUrl);
        }
        if (!fetchRes.ok) {
          fetchRes = await fetch(cvUrl, {
            headers: { Authorization: authHeader },
          });
        }

        if (fetchRes.ok) {
          const arrayBuffer = await fetchRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          // Cache on disk for sub-millisecond future loads
          try {
            await fs.mkdir(path.dirname(cachePath), { recursive: true });
            await fs.writeFile(cachePath, buffer);
          } catch (cacheErr) {
            console.warn('Cache write failed:', cacheErr);
          }

          const disposition = isDownload ? 'attachment' : 'inline';
          const contentType = format === 'pdf' ? 'application/pdf' : 'application/octet-stream';
          const filename = `CV_${safeName}_${safeJob}.${format}`;

          return new Response(buffer, {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
              'Cache-Control': 'public, max-age=3600',
            },
          });
        }
      }
    }

    // 3. Case: External URL (Google Drive, LinkedIn, etc.) or fallback
    return NextResponse.redirect(cvUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi mở tệp CV';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
