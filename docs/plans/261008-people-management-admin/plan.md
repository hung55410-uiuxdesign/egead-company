---
title: "Quản lý Nhân sự & Sơ đồ Tổ chức (People Management)"
description: "Xây dựng phân hệ quản lý nhân sự trong admin CMS (CRUD + sơ đồ squads) và nối dữ liệu động vào trang public /people."
status: completed
priority: P1
effort: 28h
branch: develop
tags: [feature, frontend, backend, database, api]
created: 2026-10-08
references:
  - "docs/brainstorms/people-management/brainstorm-people-admin.md"
---

# People Management — Implementation Plan

## Overview

Thêm phân hệ quản lý nhân sự tại `app/(admin)/admin/people`: CRUD nhân sự (PostgreSQL + Prisma), màn hình quản lý Sơ đồ Tổ chức & Squads độc lập, seed dữ liệu hiện có từ `peopleData.ts` / `leaderTeamData.ts`, và nối dữ liệu sống vào trang public `app/(public)/people` (giữ fallback static).

Nguồn kiến trúc: brainstorm đã thống nhất — `docs/brainstorms/people-management/brainstorm-people-admin.md`.

## Quyết Đã Chốt (Decisions)

- **Zod**: cài `zod` — validate payload TeamMember + hierarchy `childNodes` (theo brainstorm).
- **Auth API**: mọi route `/api/admin/people*` kiểm tra session server-side qua `auth.api.getSession()` + role `admin` (route hiện tại chưa làm — chỉ áp dụng cho people, làm pattern sau cho route khác).
- **Public data**: trang public nhận dữ liệu qua props từ server component (gọi service trực tiếp) thay vì tạo public API mới — KISS, tránh thừa endpoint không ai dùng.
- **Seed**: `scripts/seed-people.ts` chạy bằng `bun` (import trực tiếp data TS, không duplicate dữ liệu), idempotent (upsert), giữ nguyên source id `lead-*` / `exp-*`.
- **Deviations từ brainstorm**: (1) số liệu 7 lãnh đạo/28 chuyên gia là sai — thực tế **8 leaders + 18 experts = 26 thành viên**; (2) export tên `leaderHierarchies` (không phải `leaderTeamHierarchy`).

## Phases

| # | Phase | Status | Effort | Link |
|---|-------|--------|--------|------|
| 1 | Schema, Zod, Service, Seed | Completed | 5h | [phase-01](./phase-01-schema-service-seed.md) |
| 2 | API Routes (admin) + Auth guard | Completed | 5h | [phase-02](./phase-02-api-routes.md) |
| 3 | Sidebar + Danh sách + Form CRUD | Completed | 7h | [phase-03](./phase-03-admin-list-form.md) |
| 4 | Màn hình Sơ đồ Tổ chức & Squads | Completed | 7h | [phase-04](./phase-04-hierarchy-screen.md) |
| 5 | Nối trang Public + Tests | Completed | 4h | [phase-05](./phase-05-public-tests.md) |

## Dependencies

- Phase 1 → Phase 2 → Phase 3 → Phase 4 (sequential).
- Phase 5 phụ thuộc Phase 1–2 (service + API), song song được với Phase 3–4.
- Dependency bên ngoài: `zod` (mới cài), Cloudinary env đã có, `@astryxdesign/core` `Field`/`FieldLabel` đã có sẵn (chưa dùng ở đâu).

## Constraints (AGENTS.md — bắt buộc)

- Không `capitalize`, `uppercase`, mọi utility `tracking-*`.
- Không đặt icon dính liền trước chữ trong badge/button/table cell/pill (sidebar nav giữ nguyên pattern icon+label hiện có).
- Dùng trọn `Button`, `Badge`, `Card`, `EmptyState`, `Field`, `FieldLabel` từ `@astryxdesign/core`.
- Response API theo convention `{ success: true, data }` / `{ success: false, error }`.

## Risks

| Rủi ro | Giảm thiểu |
|---|---|
| JSON `childNodes` phức tạp, sai cấu trúc | Zod schema `ChildNode`/`SubChildNode` type-checked trước khi ghi DB (Phase 1) |
| DDL trùng lặp trong `lib/services/auth.service.ts` + `scripts/seed.mjs` | Bổ sung `CREATE TABLE IF NOT EXISTS` cho 2 bảng mới theo convention hiện có, bên cạnh `prisma db push` |
| Public page đổi dữ liệu → hỏng giao diện | Fallback tĩnh về `peopleData.ts`/`leaderHierarchies` khi service lỗi (Phase 5) |
| Ảnh chân dung nặng | Tái dùng `/api/admin/upload` + Cloudinary transformation (folder `egead_cms/people`) |
