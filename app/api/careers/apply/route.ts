import { NextRequest, NextResponse } from 'next/server';
import { submitApplication } from '@/lib/careers';
import { uploadDocumentBuffer, validateDocumentFile } from '@/lib/services/upload.service';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let fullName = '';
    let email = '';
    let phone = '';
    let jobId = 'general';
    let jobTitle = '';
    let cvUrl = '';
    let coverLetter: string | undefined;
    let portfolioUrl: string | undefined;
    let expectedSalary: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();

      const firstName = (formData.get('firstName') as string) || '';
      const lastName = (formData.get('lastName') as string) || '';
      fullName = (formData.get('fullName') as string) || `${firstName} ${lastName}`.trim();
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || '';
      jobId = (formData.get('jobId') as string) || 'general';
      jobTitle = (formData.get('jobTitle') as string) || '';
      coverLetter = (formData.get('coverLetter') as string) || (formData.get('message') as string) || undefined;
      portfolioUrl = (formData.get('portfolioUrl') as string) || undefined;
      expectedSalary = (formData.get('expectedSalary') as string) || undefined;

      const file = formData.get('file');

      if (file && file instanceof File && file.size > 0) {
        const validation = validateDocumentFile({
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

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await uploadDocumentBuffer(buffer, file.name, {
          folder: 'egead_cms/cv',
        });
        cvUrl = uploadResult.secureUrl;
      } else {
        cvUrl = (formData.get('cvUrl') as string) || '';
      }
    } else {
      const body = await request.json();
      fullName = body.fullName || `${body.firstName || ''} ${body.lastName || ''}`.trim();
      email = body.email || '';
      phone = body.phone || '';
      jobId = body.jobId || 'general';
      jobTitle = body.jobTitle || '';
      cvUrl = body.cvUrl || '';
      coverLetter = body.coverLetter || body.message || undefined;
      portfolioUrl = body.portfolioUrl || undefined;
      expectedSalary = body.expectedSalary || undefined;
    }

    if (!fullName) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng cung cấp họ và tên của bạn.' },
        { status: 400 }
      );
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng cung cấp địa chỉ email hợp lệ.' },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng cung cấp số điện thoại liên hệ.' },
        { status: 400 }
      );
    }
    if (!cvUrl) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng tải lên tệp CV (PDF, DOC, DOCX) hoặc nhập link CV.' },
        { status: 400 }
      );
    }

    const application = await submitApplication({
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      cvUrl,
      coverLetter,
      portfolioUrl,
      expectedSalary,
      status: 'pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Hồ sơ ứng tuyển của bạn đã được gửi thành công!',
        data: application,
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Lỗi hệ thống khi gửi hồ sơ ứng tuyển';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
