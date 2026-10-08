# Phase 4: Màn hình Sơ đồ Tổ chức & Squads

## Context Links
- Brainstorm Mục 2 (LeaderHierarchy), 3.4 (UI hierarchy)
- Data model: `app/(public)/people/leaderTeamData.ts` — `LeaderTeamHierarchy`, `ChildNode`, `SubChildNode`
- Public xem trước: `app/(public)/people/LeaderTreeMap.tsx`

## Overview
- **Priority**: P1
- **Status**: completed
- **Effort**: 7h
- **Blocked by**: Phase 2 (cần GET/POST hierarchy API), phụ thuộc Phase 3 (Dropdown chọn nhân sự dùng chung data)

Màn hình độc lập `/admin/people/hierarchy`: chọn Lãnh đạo → thiết lập phạm vi & overview → quản lý danh sách Squads (CRUD trong state) → phân bổ thành viên → lưu toàn bộ cây.

## Key Insights
- Dữ liệu dạng cây 2 cấp: `ChildNode` (Squad) → `children: SubChildNode[]` (thành viên trực thuộc). Squad Lead là một `ChildNode` chọn từ member (`levelTag` mô tả vai trò).
- API hierarchy lưu **toàn bộ cây** theo leader (upsert 1 lần) — UI quản lý tree trong local state, chỉ `POST` khi bấm Lưu (đơn giản, không cần endpoint từng node).
- Zod `hierarchyInputSchema` (Phase 1) là validation cuối — client tự validate từng field để báo lỗi sớm.
- `git` rule brainstorm: thứ tự Squads = mảng trong `childNodes` (index = order) — hỗ trợ lên/xuống thay vì kéo thả phức tạp (KISS).

## Requirements
- Dropdown chọn 1 trong các Lãnh đạo (`isLeader=true`, fetch `GET /api/admin/people?isLeader=true`).
- `Field` Phạm vi phòng ban (`departmentScope`), `Field` Tổng quan chiến lược (`overview`, textarea).
- Danh sách Squad dạng `Card` list, mỗi squad có: `squadName`, `squadFocus`, `levelTag`, chọn Squad Lead (select từ 26 member), `responsibility` của Lead.
- Thành viên trực thuộc (`children`): thêm từ member (select, không trùng), mỗi người 1 `responsibility`, xóa/thay đổi vị trí (lên/xuống).
- Thêm Squad mới, xóa Squad, sắp xếp thứ tự.
- Đánh dấu dirty state, nút `Button` "Lưu" + cảnh báo khi rời trang có thay đổi chưa lưu.

## Architecture
```
people/hierarchy/page.tsx (server) ── fetch leaders ──► PeopleHierarchyClient
                                                        │
  state: { leaderId, departmentScope, overview, childNodes[] }
  ├── GET /api/admin/people/hierarchy?leaderId=  → hydrate
  ├── GET /api/admin/people?isLeader=true        → dropdown leaders
  ├── GET /api/admin/people?limit=100            → member pool (dropdown)
  └── POST /api/admin/people/hierarchy           → save (zod server-side)
```

## Related Code Files
| Action | Path |
|---|---|
| Create | `app/(admin)/admin/people/hierarchy/page.tsx` |
| Create | `components/admin/PeopleHierarchyClient.tsx` — layout chính |
| Create | `components/admin/SquadCardEditor.tsx` — editor 1 Squad + children |
| Modify | `components/admin/AdminSidebar.tsx` — (đã làm ở Phase 3, chỉ kiểm tra active state) |

## Implementation Steps
1. Page server: fetch danh sách leaders (`getTeamMembers({ isLeader: true })`) → `PeopleHierarchyClient`.
2. `PeopleHierarchyClient.tsx`:
   - State form + `hasChanges` flag; đổi leader khi dirty → confirm().
   - Khi chọn leader: `GET hierarchy?leaderId=` → hydrate state (null → khởi tạo rỗng với `childNodes: []`).
   - Khối "Phạm vi & Chiến lược": 2 `Field`.
   - Danh sách `SquadCardEditor` theo thứ tự, mỗi card có nút lên/xuống/xóa (`isIconOnly` + tooltip) và toggle thu gọn.
   - Nút "Thêm Squad" → push `ChildNode` rỗng (`squadName: ''`, `children: []`).
   - Nút "Lưu" → validate cơ bản (mỗi squad có `squadName`; leader đã chọn) → `POST hierarchy` → reset `hasChanges`.
3. `SquadCardEditor.tsx`:
   - `Field`: Tên Squad, Trọng tâm nghiệp vụ, Nhãn cấp bậc (`levelTag`, ví dụ "Trưởng nhóm phụ trách / Squad Lead"), Trách nhiệm trọng tâm của Lead.
   - Select Squad Lead + select thêm thành viên (loại trừ leader, trừ người đã trong squad, trừ leader của squads khác nếu cần — tối thiểu: không trùng trong cùng cây).
   - Table/list `children`: tên, input `responsibility`, nút lên/xuống/xóa.
   - Mọi thay đổi gọi `onChange(nextChildNode)` → cha cập nhật state.
4. Rà soát AGENTS.md: không uppercase/tracking; không icon trước chữ; dùng Astryx `Button`, `Badge`, `Card`, `Field`, `FieldLabel`, `EmptyState` (squad rỗng).

## Todo List
- [x] Page `hierarchy/page.tsx`
- [x] `PeopleHierarchyClient` (leader picker, scope fields, list squad, save flow)
- [x] `SquadCardEditor` (lead + children + responsibility + reorder)
- [x] Dirty-state guard
- [x] Kiểm tra AGENTS.md compliance

## Success Criteria
- Chọn `lead-1` thấy cây seed hiện ra đầy đủ (squad + children + responsibility).
- Thêm/sửa/xóa/sắp xếp squad & member → Lưu → reload giữ nguyên.
- Leader chưa có hierarchy → form rỗng, lưu tạo mới; lưu lại lần 2 → update (không duplicate).

## Risk Assessment
- Tree state phức tạp → dùng immutable update helper (`updateNode(childNodes, index, next)`) và type đúng theo `ChildNode`/`SubChildNode` import từ `leaderTeamData.ts` (DRY — không định nghĩa lại type).
- Member pool lớn → `limit=100` + filter search trong dropdown (YAGNI: chưa cần combobox library).

## Security Considerations
- Zod server-side chặn cấu trúc lạ trong `childNodes`; `leaderId` phải tồn tại & `isLeader=true` (kiểm tra trong service upsert).

## Next Steps
→ Phase 5: nối trang public + tests.
