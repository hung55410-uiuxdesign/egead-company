import { NextRequest, NextResponse } from 'next/server';
import { uploadMediaBuffer, validateMediaFile } from '@/lib/services/upload.service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') as string) || 'egead_cms/media';

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn tệp hình ảnh hoặc video để tải lên (thiếu trường file)' },
        { status: 400 }
      );
    }

    const validation = validateMediaFile({
      size: file.size,
      type: file.type,
      name: file.name,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const isVideo = validation.mediaType === 'video';
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadMediaBuffer(buffer, {
      folder,
      resourceType: isVideo ? 'video' : 'image',
    });

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      resourceType: result.resourceType || (isVideo ? 'video' : 'image'),
      duration: result.duration,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi tải tệp lên Cloudinary';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

