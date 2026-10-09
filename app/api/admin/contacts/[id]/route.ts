import { NextRequest, NextResponse } from 'next/server';
import {
  getContactInquiryById,
  updateContactInquiryStatus,
  updateContactInquiryNotes,
  deleteContactInquiry,
} from '@/lib/contacts';
import type { ContactInquiryStatus } from '@/types/contact';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const inquiry = await getContactInquiryById(id);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy yêu cầu liên hệ.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const current = await getContactInquiryById(id);
    if (!current) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy yêu cầu liên hệ để cập nhật.' },
        { status: 404 }
      );
    }

    let updated = current;

    if (body.status !== undefined) {
      const validStatuses: ContactInquiryStatus[] = [
        'new',
        'contacted',
        'resolved',
        'archived',
      ];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { success: false, error: 'Trạng thái không hợp lệ.' },
          { status: 400 }
        );
      }
      const res = await updateContactInquiryStatus(id, body.status);
      if (res) updated = res;
    }

    if (body.notes !== undefined) {
      const res = await updateContactInquiryNotes(id, body.notes, body.status);
      if (res) updated = res;
    }

    return NextResponse.json({
      success: true,
      message: 'Cập nhật yêu cầu liên hệ thành công.',
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteContactInquiry(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Không thể xoá yêu cầu liên hệ.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Đã xoá yêu cầu liên hệ thành công.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
