# Phase 1: Prisma Schema, Zod Validation, People Service, Seed

## Context Links
- Brainstorm: `docs/brainstorms/people-management/brainstorm-people-admin.md` (Mục 2, 5)
- `prisma/schema.prisma`, `lib/prisma.ts`, `lib/services/blog.service.ts` (pattern mẫu)
- Data nguồn: `app/(public)/people/peopleData.ts`, `app/(public)/people/leaderTeamData.ts`

## Overview
- **Priority**: P1 — blocker cho mọi phase sau
- **Status**: completed
- **Effort**: 5h

Đưa 2 model mới vào Prisma, cài zod, xây service layer, seed 26 nhân sự + sơ đồ hiện có vào `egead_db`.

## Key Insights
- `lib/prisma.ts` export singleton `prisma` — service luôn `import { prisma } from '@/lib/prisma'`.
- **DDL trùng lặp**: `lib/services/auth.service.ts` (`ensureDatabaseTablesExist`) và `scripts/seed.mjs` (`ensureTables`) tự tạo bảng bằng raw SQL. Phải bổ sung 2 bảng mới vào cả 2 chỗ, nếu không môi trường mới sẽ thiếu bảng dù đã `prisma db push`.
- Data thực tế: **8 leaders (`lead-1`..`lead-8`) + 18 experts (`exp-1`..`exp-18`) = 26** (brainstorm ghi 7/28/35 là sai).
- Export hierarchy tên `leaderHierarchies: Record<string, LeaderTeamHierarchy>` (không phải `leaderTeamHierarchy`).
- Zod chưa được cài — thêm vào `dependencies`.
- Giữ nguyên source id (`lead-*`, `exp-*`) làm primary key khi seed để `leaderHierarchies` map thẳng tới `leaderId`.

## Requirements
- 2 model Prisma đúng đặc tả brainstorm (TeamMember, LeaderHierarchy), map bảng `team_member`, `leader_hierarchy`.
- Zod schema cho payload tạo/sửa nhân sự và cấu trúc `childNodes` (ChildNode/SubChildNode).
- Service trả về dữ liệu theo shape `TeamMember` public (bao gồm `skills: string[]`, dates → ISO string).
- Seed idempotent: chạy lại không tạo trùng.

## Architecture
```
peopleData.ts / leaderTeamData.ts
        │ (bun import, direct TS)
        ▼
scripts/seed-people.ts ──upsert──► PostgreSQL (team_member, leader_hierarchy)
                                         ▲
lib/validations/people.ts (zod)          │ prisma singleton
        ▲                                │
        └──── lib/services/people.service.ts ◄── API routes (Phase 2)
```

## Related Code Files
| Action | Path |
|---|---|
| Modify | `prisma/schema.prisma` — thêm 2 model |
| Create | `lib/validations/people.ts` — zod schemas |
| Create | `lib/services/people.service.ts` — CRUD + hierarchy + stats |
| Create | `lib/people.ts` — re-export (theo pattern `lib/blogs.ts`) |
| Modify | `lib/services/auth.service.ts` — thêm DDL 2 bảng vào `ensureDatabaseTablesExist` |
| Modify | `scripts/seed.mjs` — thêm DDL 2 bảng vào `ensureTables` |
| Create | `scripts/seed-people.ts` — seed data |
| Modify | `package.json` — thêm `zod`, script `seed:people` |

## Implementation Steps
1. Cài zod: `bun add zod`.
2. Thêm 2 model vào `prisma/schema.prisma` đúng đặc tả brainstorm (giữ nguyên field, index, `@@map`).
3. Chạy `bun run prisma:push` + `bun run prisma:generate`.
4. Bổ sung `CREATE TABLE IF NOT EXISTS team_member / leader_hierarchy` (raw SQL khớp schema Prisma) vào `ensureDatabaseTablesExist` (`lib/services/auth.service.ts`) và `ensureTables` (`scripts/seed.mjs`).
5. Tạo `lib/validations/people.ts`:
   - `teamMemberInputSchema`: `name` (min 1), `role` (min 1), `department` (enum 5 khối), `location`, `quote?`, `image` (url), `linkedin?`, `bio`, `skills` (string[]), `isLeader` (boolean), `order` (int), `status` enum `published|draft|archived`.
   - `childNodesSchema`: đệ quy `subChildNodeSchema` → `childNodeSchema` (children: array subChildNode), các field `squadName`, `squadFocus`, `levelTag`, `responsibility`.
   - `hierarchyInputSchema`: `leaderId`, `departmentScope`, `overview`, `childNodes`.
   - Export type infer: `export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>`.
6. Tạo `lib/services/people.service.ts` (pattern `blog.service.ts`):
   - `getTeamMembers(filter?: { search?, department?, isLeader?, status?, page?, limit? })` → `{ items, total, page, totalPages }`; search case-insensitive `contains` trên name/role/location/skills.
   - `getTeamMember(id)` → kèm `hierarchy` nếu là leader.
   - `createTeamMember(data)` / `updateTeamMember(id, data)` / `deleteTeamMember(id)` (xóa cascade `LeaderHierarchy` nhờ relation).
   - `getPeopleStats()` → `{ total, leaders, experts, published }` (aggregate count).
   - `getHierarchy(leaderId)`, `upsertHierarchy(data)` — validate bằng zod trước khi ghi `childNodes` (Json).
   - Map dates → `.toISOString()` khi trả về.
7. Tạo `lib/people.ts`: `export * from '@/lib/services/people.service';`.
8. Tạo `scripts/seed-people.ts` (chạy bằng bun — import trực tiếp data TS, DRY):
   ```ts
   import { leadershipTeam, allExperts } from '../app/(public)/people/peopleData';
   import { leaderHierarchies } from '../app/(public)/people/leaderTeamData';
   // upsert TeamMember với id giữ nguyên (lead-*, exp-*)
   // isLeader = leadershipTeam.some(m => m.id === member.id)
   // upsert LeaderHierarchy: leaderId + departmentScope + overview + childNodes (JSON.stringify)
   ```
   - Idempotent: `prisma.teamMember.upsert` theo id; hierarchy `upsert` theo `leaderId`.
   - Log số bản ghi đã ghi.
9. Thêm script vào `package.json`: `"seed:people": "bun scripts/seed-people.ts"`.
10. Chạy seed, kiểm tra bằng `psql`/Prisma Studio: 26 rows `team_member`, 8 rows `leader_hierarchy`.

## Todo List
- [x] Cài zod
- [x] Prisma schema 2 model + db push + generate
- [x] DDL 2 bảng vào auth.service.ts + seed.mjs
- [x] `lib/validations/people.ts`
- [x] `lib/services/people.service.ts` + `lib/people.ts`
- [x] `scripts/seed-people.ts` + package.json script
- [x] Seed thành công 26 nhân sự, 8 sơ đồ

## Success Criteria
- `bun run prisma:push` không lỗi; `prisma generate` ra client mới.
- `bun run seed:people` chạy 2 lần đều idempotent.
- Query service trả đúng shape `TeamMember` của public page.

## Risk Assessment
- Raw DDL lệch schema Prisma → tạo DDL từ chính schema vừa push, đối chiếu cột từng cái.
- `skills` (text[]) map không đúng → kiểm tra Prisma native array, không cần chuyển đổi JSON.

## Security Considerations
- Seed chỉ chạy local/dev, không deploy; env `DATABASE_URL` đã có trong `.env`.

## Next Steps
→ Phase 2: API routes.
