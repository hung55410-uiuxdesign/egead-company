import { NextRequest, NextResponse } from 'next/server';
import { submitContactInquiry } from '@/lib/contacts';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, company, email, phone, region, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Vui lòng điền đầy đủ các thông tin bắt buộc: Họ, Tên, Email và Lời nhắn.',
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại.',
        },
        { status: 400 }
      );
    }

    const inquiry = await submitContactInquiry({
      firstName,
      lastName,
      company: company?.trim() || '',
      email,
      phone: phone || '',
      region: region?.trim() || 'Vietnam',
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thông tin liên hệ của bạn đã được gửi thành công! E-GEAD sẽ phản hồi trong thời gian sớm nhất.',
        data: inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || 'Đã có lỗi xảy ra khi gửi thông tin.',
      },
      { status: 500 }
    );
  }
}
