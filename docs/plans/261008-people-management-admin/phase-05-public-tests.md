# Phase 5: Nối dữ liệu động vào trang Public + Tests

## Context Links
- `app/(public)/people/page.tsx`, `PeopleClientView.tsx`, `LeaderRow.tsx`, `LeaderTreeMap.tsx`
- Test framework: `bun:test` (xem `tests/blog-service.test.ts`), script `test` trong `package.json` liệt kê file thủ công

## Overview
- **Priority**: P2
- **Status**: completed
- **Effort**: 4h
- **Blocked by**: Phase 1–2 (service + API); song song được với Phase 3–4

Trang public `/people` đọc dữ liệu sống từ DB qua service (server-side), fallback về data tĩnh nếu DB lỗi. Viết unit test cho validation & service.

## Key Insights
- `page.tsx` là server component → gọi service trực tiếp, truyền props xuống `PeopleClientView` (client). **Không cần public API endpoint** (KISS — đã chốt trong plan.md).
- `PeopleClientView` hiện import static `leadershipTeam`, `allExperts`, `DepartmentFilter`; `LeaderTreeMap` import `leaderHierarchies` — cả 2 phải chuyển sang prop.
- Fallback: service throw/không trả gì → dùng lại data tĩnh (đúng rủi ro brainstorm Mục 7).
- Script `test` trong `package.json` **enumerate từng file** — file test mới phải được thêm vào.

## Requirements
- Public page hiển thị dữ liệu từ DB; DB lỗi → render data tĩnh, không crash.
- Shape dữ liệu public giữ nguyên (UI không đổi).
- Unit test: zod schema (hợp lệ/bất hợp lệ), logic seed-consistency (mọi id trong hierarchy khớp member), mapping service (nếu test được không cần DB thật).

## Related Code Files
| Action | Path |
|---|---|
| Modify | `app/(public)/people/page.tsx` — fetch service + fallback → props |
| Modify | `app/(public)/people/PeopleClientView.tsx` — nhận `initialPeople` prop |
| Modify | `app/(public)/people/LeaderTreeMap.tsx` — nhận `hierarchies` prop (bỏ import static) |
| Modify | `app/(public)/people/LeaderRow.tsx` — truyền prop xuống `LeaderTreeMap` |
| Create | `tests/people-validation.test.ts` |
| Modify | `package.json` — thêm test file vào script `test` |

## Implementation Steps
1. `page.tsx` (server):
   ```tsx
   let people = leadershipTeam.concat(allExperts);
   let hierarchies = leaderHierarchies;
   try {
     const dbPeople = await getTeamMembers({ status: 'published', limit: 100 });
     if (dbPeople.items.length > 0) {
       people = dbPeople.items;
       hierarchies = await getAllHierarchies(); // service helper mới (Map/Record<leaderId, tree>)
     }
   } catch { /* fallback tĩnh */ }
   return <PeopleClientView initialPeople={people} initialHierarchies={hierarchies} />;
   ```
   - Thêm `getAllHierarchies()` vào `people.service.ts` (Phase 1 có `getHierarchy` — bổ sung variant lấy tất cả).
   - Mapping DB row → `TeamMember` public shape phải khớp 100% (đặc biệt `image` URL, `skills`, optional fields).
2. `PeopleClientView`: `initialPeople` thay static import; giữ nguyên filter/search/`DepartmentFilter` type (type vẫn import từ `peopleData.ts` — chỉ data đổi).
3. `LeaderTreeMap`: đổi prop `hierarchies: Record<string, LeaderTeamHierarchy>` thay vì `import { leaderHierarchies }`; `LeaderRow` truyền xuống.
4. Kiểm tra fallback: tắt DB → trang vẫn render data tĩnh.
5. `tests/people-validation.test.ts` (bun:test):
   - `teamMemberInputSchema`: hợp lệ pass; thiếu `name` fail; `department` sai enum fail.
   - `childNodesSchema`: cây seed từ `leaderTeamData.ts` parse pass toàn bộ (8 leader) — bắt regression cấu trúc.
   - Seed consistency: mọi `id` trong `childNodes.children` tồn tại trong `leadershipTeam`/`allExperts`.
6. Thêm `tests/people-validation.test.ts` vào script `test` trong `package.json`.
7. Chạy `bun test` toàn bộ + `bun run build` (typecheck Next).

## Todo List
- [x] `getAllHierarchies()` trong service
- [x] `page.tsx` fetch + fallback
- [x] `PeopleClientView` / `LeaderRow` / `LeaderTreeMap` chuyển sang props
- [x] Fallback test thủ công (tắt DB)
- [x] `tests/people-validation.test.ts` + package.json
- [x] `bun test` + `bun run build` pass

## Success Criteria
- Trang `/people` hiển thị dữ liệu DB sau khi seed; không còn import static data trong render path (trừ fallback + types).
- Tắt DB → trang không crash, hiện data tĩnh.
- `bun test` pass 100%; `bun run build` không lỗi type.

## Risk Assessment
- Admin đổi status member sang `draft` → member biến mất khỏi public nhưng vẫn còn trong hierarchy tree → service public filter tree, loại node không khớp member published (quy tắc: tree chỉ render node có member còn hiển thị).

## Security Considerations
- Public page chỉ đọc dữ liệu `published`; không expose field nhạy cảm (không có — schema không chứa dữ liệu riêng tư).

## Next Steps
- Hoàn tất — báo cáo vào plan.md (đánh dấu status completed).
- Việc còn lại tùy chọn: endpoint `app/api/public/people/` chỉ tạo khi có consumer thật (YAGNI).
