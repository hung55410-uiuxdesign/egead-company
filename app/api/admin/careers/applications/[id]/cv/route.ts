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

function getMimeType(formatOrExt: string): string {
  const f = formatOrExt.toLowerCase().replace(/^\./, '');
  if (f === 'pdf') return 'application/pdf';
  if (f === 'docx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  if (f === 'doc') return 'application/msword';
  return 'application/octet-stream';
}

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
    const disposition = isDownload ? 'attachment' : 'inline';

    // 0. Case: Base64 Data URI (fallback storage in DB)
    if (cvUrl.startsWith('data:')) {
      const match = cvUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const ext =
          mimeType === 'application/pdf'
            ? '.pdf'
            : mimeType.includes('wordprocessingml')
            ? '.docx'
            : mimeType === 'application/msword'
            ? '.doc'
            : '.pdf';
        const filename = `CV_${safeName}_${safeJob}${ext}`;

        return new Response(new Uint8Array(buffer), {
          headers: {
            'Content-Type': mimeType,
            'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
            'Cache-Control': 'private, max-age=3600',
          },
        });
      }
    }

    // 1. Case: Local file in /uploads/
    if (cvUrl.startsWith('/uploads/')) {
      const localFilePath = path.join(process.cwd(), 'public', cvUrl);
      try {
        const fileBuffer = await fs.readFile(localFilePath);
        const ext = path.extname(localFilePath).toLowerCase() || '.pdf';
        const contentType = getMimeType(ext);
        const filename = `CV_${safeName}_${safeJob}${ext}`;

        return new Response(new Uint8Array(fileBuffer), {
          headers: {
            'Content-Type': contentType,
            'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
            'Cache-Control': 'private, max-age=3600',
          },
        });
      } catch (err) {
        console.error('Lỗi đọc tệp local CV:', err);
      }
    }

    // 2. Case: Cloudinary URL (supports both /raw/upload/ and /image/upload/)
    if (cvUrl.includes('cloudinary.com')) {
      const uploadPathMatch = cvUrl.match(
        /\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/
      );
      const detectedResourceType = uploadPathMatch ? uploadPathMatch[1] : 'raw';
      const fullPathAfterVersion = uploadPathMatch
        ? decodeURIComponent(uploadPathMatch[2])
        : null;

      if (fullPathAfterVersion) {
        const extMatch = fullPathAfterVersion.match(/\.([a-zA-Z0-9]+)$/);
        const format = extMatch ? extMatch[1].toLowerCase() : 'pdf';
        const publicIdWithoutExt = extMatch
          ? fullPathAfterVersion.slice(0, -extMatch[0].length)
          : fullPathAfterVersion;
        const publicIdWithExt = fullPathAfterVersion;

        const baseFilename = path.basename(publicIdWithoutExt) || 'file';
        const cachePath = path.join(
          process.cwd(),
          'public',
          'uploads',
          'cv',
          `${baseFilename}.${format}`
        );

        // Check if already cached locally
        try {
          const cachedBuffer = await fs.readFile(cachePath);
          const contentType = getMimeType(format);
          const filename = `CV_${safeName}_${safeJob}.${format}`;

          return new Response(new Uint8Array(cachedBuffer), {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
              'Cache-Control': 'private, max-age=3600',
            },
          });
        } catch {
          // Cache miss, proceed to fetch via Cloudinary Private Download API
        }

        // Build candidate private download URLs (bypasses "Customer is marked as untrusted" CDN block)
        const candidateUrls: string[] = [];

        if (detectedResourceType === 'raw') {
          candidateUrls.push(
            cloudinary.utils.private_download_url(publicIdWithExt, '', {
              resource_type: 'raw',
              type: 'upload',
            }),
            cloudinary.utils.private_download_url(publicIdWithoutExt, format, {
              resource_type: 'raw',
              type: 'upload',
            }),
            cloudinary.utils.private_download_url(publicIdWithoutExt, format, {
              resource_type: 'image',
              type: 'upload',
            })
          );
        } else {
          candidateUrls.push(
            cloudinary.utils.private_download_url(publicIdWithoutExt, format, {
              resource_type: 'image',
              type: 'upload',
            }),
            cloudinary.utils.private_download_url(publicIdWithExt, '', {
              resource_type: 'raw',
              type: 'upload',
            }),
            cloudinary.url(`${publicIdWithoutExt}.${format}`, {
              resource_type: 'image',
              secure: true,
              sign_url: true,
              type: 'upload',
            })
          );
        }

        let fetchedBuffer: Buffer | null = null;

        for (const candidateUrl of candidateUrls) {
          try {
            const res = await fetch(candidateUrl);
            if (res.ok) {
              const arrayBuffer = await res.arrayBuffer();
              if (arrayBuffer.byteLength > 0) {
                fetchedBuffer = Buffer.from(arrayBuffer);
                break;
              }
            }
          } catch {
            // Try next candidate
          }
        }

        if (fetchedBuffer) {
          // Optional local disk cache when filesystem is writable
          try {
            await fs.mkdir(path.dirname(cachePath), { recursive: true });
            await fs.writeFile(cachePath, fetchedBuffer);
          } catch {
            // Read-only filesystem on Vercel serverless — safe to ignore
          }

          const contentType = getMimeType(format);
          const filename = `CV_${safeName}_${safeJob}.${format}`;

          return new Response(new Uint8Array(fetchedBuffer), {
            headers: {
              'Content-Type': contentType,
              'Content-Disposition': `${disposition}; filename="${encodeURIComponent(filename)}"`,
              'Cache-Control': 'private, max-age=3600',
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
