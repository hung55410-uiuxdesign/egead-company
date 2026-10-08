# Phase 3: Sidebar, Danh sách Nhân sự, Form Tạo/Sửa

## Context Links
- Brainstorm Mục 3.1–3.3
- Pattern mẫu: `app/(admin)/admin/blogs/page.tsx` + `components/admin/BlogListClient.tsx` + `components/admin/BlogEditorClient.tsx`
- `components/admin/AdminSidebar.tsx`, `app/api/admin/upload/route.ts`

## Overview
- **Priority**: P1
- **Status**: completed
- **Effort**: 7h
- **Blocked by**: Phase 2

Menu sidebar nhóm People, trang danh sách (filter/search/stats), form tạo mới & chỉnh sửa nhân sự (kèm upload ảnh Cloudinary, tag input kỹ năng).

## Key Insights
- Pattern chuẩn: page server component (`export const dynamic = 'force-dynamic'`) fetch service → truyền `initial*` props xuống client component. **Không fetch trực tiếp từ client cho danh sách lần đầu.**
- Chưa có DataTable helper — danh sách tự dựng `<table>` trong `Card` (theo `BlogListClient`).
- `Field`/`FieldLabel` của Astryx **chưa từng được dùng** — đọc API tại `node_modules/@astryxdesign/core/dist/Field/index.d.ts` trước khi dùng.
- Upload: tái dùng `POST /api/admin/upload` (FormData `file` + `folder=egead_cms/people`) — đã có preview pattern trong `BlogEditorClient` (line ~74).
- AGENTS.md: không `capitalize`/`uppercase`/`tracking-*`; không icon dính trước chữ trong badge/button/cell; dùng `Button`, `Badge`, `Card`, `EmptyState`, `Field`, `FieldLabel`.

## Requirements
- **Danh sách**: header "Quản lý Đội ngũ & Nhân sự" + `Button` "Thêm nhân sự mới" + 4 số liệu (Tổng số, Lãnh đạo, Chuyên gia, Đang hiển thị).
- **Filter**: search theo tên/chức danh/kỹ năng/địa điểm; tab phòng ban (Tất cả, Lãnh đạo, 5 khối — note: "Lãnh đạo" là filter `isLeader`, không phải phòng ban); filter trạng thái (Tất cả, Đang hiển thị, Bản nháp).
- **Bảng**: Avatar, Họ và tên, Chức danh & Phòng ban (`Badge`), Phân loại (`Badge` Lãnh đạo/Chuyên gia), Địa điểm, Thứ tự, Thao tác (Chỉnh sửa, Xóa — icon button `isIconOnly` + tooltip).
- **EmptyState** khi không có dữ liệu/kết quả filter rỗng.
- **Form**: đủ các trường theo brainstorm 3.3 (2 khối Card: thông tin chính + truyền thông & kỹ năng).

## Architecture
```
admin/people/page.tsx (server) ── getTeamMembers + getPeopleStats ──► PeopleListClient
admin/people/new/page.tsx (server) ────────────────────────────────► PeopleFormClient (mode=create)
admin/people/[id]/page.tsx (server) ── getTeamMember ──────────────► PeopleFormClient (mode=edit)
                                                        │
                                       fetch POST/PUT /api/admin/people
                                       fetch POST /api/admin/upload (ảnh)
```

## Related Code Files
| Action | Path |
|---|---|
| Modify | `components/admin/AdminSidebar.tsx` — thêm `PEOPLE_NAV_ITEMS` + group heading "Nhân sự & Tổ chức" |
| Create | `app/(admin)/admin/people/page.tsx` |
| Create | `components/admin/PeopleListClient.tsx` |
| Create | `app/(admin)/admin/people/new/page.tsx` |
| Create | `app/(admin)/admin/people/[id]/page.tsx` |
| Create | `components/admin/PeopleFormClient.tsx` |
| Create | `components/admin/SkillTagInput.tsx` — tag input tái sử dụng |

## Implementation Steps
1. **Sidebar**: thêm group mới theo đúng shape 3 group hiện có:
   ```tsx
   const PEOPLE_NAV_ITEMS = [
     { label: 'Danh sách nhân sự', href: '/admin/people', icon: Users, exact: true },
     { label: 'Thêm nhân sự mới', href: '/admin/people/new', icon: UserPlus, exact: false },
     { label: 'Sơ đồ tổ chức & Squads', href: '/admin/people/hierarchy', icon: GitFork, exact: false },
   ];
   ```
   + block render mới có heading nhóm. Lưu ý: `/admin/people` exact để không active khi ở `/new`/`/hierarchy`.
2. `app/(admin)/admin/people/page.tsx` (server): `getTeamMembers({ page, limit: 20, ...searchParams })` + `getPeopleStats()` → truyền xuống `PeopleListClient`.
3. `PeopleListClient.tsx`:
   - State: `search`, `departmentFilter`, `statusFilter`; debounce search 300ms rồi refetch `GET /api/admin/people?...` (hoặc navigate searchParams — chọn refetch, đơn giản hơn).
   - Stats row: 4 `Card` nhỏ, số liệu dạng chữ (KHÔNG icon trước chữ).
   - Filter tab: `Button` variant theo active (pattern tab của blog).
   - Table trong `Card`; avatar `<img>` từ `image`; phân loại/độ hiển thị bằng `Badge`; empty → `EmptyState`.
   - Sửa → `router.push(/admin/people/${id})`; Xóa → confirm() → `DELETE` → refetch.
4. `SkillTagInput.tsx`: input + Enter để thêm tag, `Badge` từng tag kèm nút xóa (`isIconOnly`), giới hạn độ dài tag, không cho trùng.
5. `PeopleFormClient.tsx` (dùng chung create/edit):
   - Khối Card "Thông tin chính": `Field` Họ và tên*, Chức danh*, Khối phòng ban (select 5 khối), Địa điểm, switch "Nhân sự thuộc Ban Lãnh đạo Cấp cao".
   - Khối Card "Truyền thông & Kỹ năng": upload ảnh (chọn file → `POST /api/admin/upload` → preview + nút xóa ảnh), `Field` LinkedIn, `Field` Quote, `SkillTagInput`, `Field` bio (textarea).
   - Validate client (bắt buộc name/role/department/image) + hiển thị lỗi qua `FieldStatus`; submit `POST`/`PUT` → toast/alert kết quả → `router.push('/admin/people')`.
   - Mode edit: prefetch `GET /api/admin/people/[id]` để điền form.
6. Page `new` và `[id]` chỉ là wrapper server render `PeopleFormClient`.

## Todo List
- [x] Sidebar group PEOPLE_NAV_ITEMS
- [x] `admin/people/page.tsx` + `PeopleListClient` (stats, filter, table, delete)
- [x] `SkillTagInput`
- [x] `PeopleFormClient` (upload ảnh, tag input, validate, submit)
- [x] Page `new` + `[id]`
- [x] Rà soát AGENTS.md (no uppercase/tracking, no icon-before-text, đủ Astryx components)

## Success Criteria
- Tạo/sửa/xóa nhân sự hoàn tất từ UI, dữ liệu hiện đúng trên bảng.
- Ảnh upload lên Cloudinary, preview hiển thị, xóa ảnh hoạt động.
- Filter/search/stats phản ánh đúng dữ liệu.
- Không có `uppercase`/`capitalize`/`tracking-*`/icon-trước-chữ trong code mới.

## Risk Assessment
- `Field` API Astryx khác dự kiến → đọc `index.d.ts` + source `Field.tsx` trước, nếu thiếu control (switch/select) thì dùng `<select>`/`<input>` kiểu blog nhưng vẫn bọc `FieldLabel`.

## Security Considerations
- Ảnh validate qua `validateImageFile` (10MB, mime whitelist) — đã có sẵn phía upload route.
- Form chỉ gửi field hợp lệ; server vẫn zod-validate (Phase 2).

## Next Steps
→ Phase 4: màn hình hierarchy.
