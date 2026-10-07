import { NextRequest, NextResponse } from 'next/server';
import { uploadImageBuffer, validateImageFile } from '@/lib/services/upload.service';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') as string) || 'egead_cms/blogs';

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng chọn tệp hình ảnh để tải lên (thiếu trường file)' },
        { status: 400 }
      );
    }

    const validation = validateImageFile({
      size: file.size,
      type: file.type,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBuffer(buffer, { folder });

    return NextResponse.json({
      success: true,
      url: result.secureUrl,
      publicId: result.publicId,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi tải ảnh lên Cloudinary';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
