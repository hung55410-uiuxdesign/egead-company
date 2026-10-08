# Phase 2: API Routes (Admin People) + Auth Guard

## Context Links
- Brainstorm Mục 4: đặc tả 7 endpoint
- Pattern mẫu: `app/api/admin/blogs/route.ts`, `app/api/admin/blogs/[id]/route.ts`
- Auth: `lib/auth.ts` (Better Auth instance), `lib/auth-client.ts`

## Overview
- **Priority**: P1
- **Status**: completed
- **Effort**: 5h
- **Blocked by**: Phase 1

Xây dựng CRUD API cho nhân sự + hierarchy, với session check server-side (quyết đã chốt — khác với các route hiện tại).

## Key Insights
- Convention response: `NextResponse.json({ success: true, data })` / `{ success: false, error }`; mã 400/401/404/500.
- Next 16: dynamic params là Promise — `{ params: Promise<{ id: string }> }`, phải `await`.
- Route tĩnh `hierarchy` được resolve trước `[id]` trong Next.js → `/api/admin/people/hierarchy` không bị nuốt (id seed dạng `lead-*`/`exp-*` cũng không trùng).
- **Chưa có helper auth sẵn** — tạo mới `requireAdmin()` dùng cho mọi route people.

## Requirements
- Đủ 7 endpoint theo brainstorm (public API không tạo — trang public đọc service trực tiếp, xem plan.md Decisions).
- Mọi route từ chối request không có session `admin` hợp lệ (401).
- Validate payload bằng zod (Phase 1) trước khi ghi DB.

## Architecture
```
Request → requireAdmin(request) ── null? → 401
              │ ok
              ▼
        zod parse (body/query) ── fail? → 400 { error }
              │ ok
              ▼
        people.service.* ── prisma
              ▼
        { success: true, data }
```

## Related Code Files
| Action | Path |
|---|---|
| Create | `lib/admin-auth.ts` — `requireAdmin()` helper |
| Create | `app/api/admin/people/route.ts` — GET list, POST create |
| Create | `app/api/admin/people/[id]/route.ts` — GET, PUT, DELETE |
| Create | `app/api/admin/people/hierarchy/route.ts` — GET `?leaderId=`, POST upsert |

## Implementation Steps
1. Tạo `lib/admin-auth.ts`:
   ```ts
   import { auth } from '@/lib/auth';
   export async function requireAdmin(): Promise<boolean> {
     const session = await auth.api.getSession({ headers: await headers() });
     return session?.user?.role === 'admin';
   }
   ```
   (Mỗi route tự trả 401 `NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })` khi `false`.)
2. `app/api/admin/people/route.ts`:
   - `GET`: query `page`, `limit` (default 20), `department`, `isLeader`, `status`, `search` → gọi `getTeamMembers`, trả `{ success, data: { items, total, page, totalPages } }`.
   - `POST`: `await request.json()` → `teamMemberInputSchema.safeParse` → fail trả 400 kèm zod issues → `createTeamMember`.
3. `app/api/admin/people/[id]/route.ts`:
   - `GET`: `getTeamMember(id)` — không thấy → 404.
   - `PUT`: zod partial parse → `updateTeamMember`.
   - `DELETE`: `deleteTeamMember(id)` → trả `{ success: true }`.
4. `app/api/admin/people/hierarchy/route.ts`:
   - `GET ?leaderId=` → `getHierarchy(leaderId)`; thiếu `leaderId` → 400; không có → `data: null` (200, client hiểu là chưa cấu hình).
   - `POST`: `hierarchyInputSchema.safeParse` → `upsertHierarchy`.
5. Apply `requireAdmin()` ở cả 7 handler (6 handler thực tế: 2 + 3 + 2).

## Todo List
- [x] `lib/admin-auth.ts`
- [x] `route.ts` GET/POST
- [x] `[id]/route.ts` GET/PUT/DELETE
- [x] `hierarchy/route.ts` GET/POST
- [x] Test bằng curl/Thunder Client: 401 không cookie, 400 payload sai, 200 hợp lệ

## Success Criteria
- Cả 6 handler trả 401 khi thiếu session admin.
- POST hợp lệ tạo bản ghi; PUT cập nhật; DELETE xóa cascade hierarchy.
- `GET /api/admin/people/hierarchy?leaderId=lead-1` trả đúng cây seed.

## Risk Assessment
- `auth.api.getSession` ném lỗi khi header thiếu → bọc try/catch, coi như chưa đăng nhập.

## Security Considerations
- Zod chặn field lạ (`.strict()` với input schema) — tránh mass-assignment (vd: không cho client set `id` tùy ý ngoài seed).
- Không trả lỗi chi tiết stack trace ra client — chỉ `{ error: message }`.

## Next Steps
→ Phase 3: UI danh sách & form.
