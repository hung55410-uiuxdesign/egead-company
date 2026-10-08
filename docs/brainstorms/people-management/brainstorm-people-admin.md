# [Brainstorm & Architecture] Phân Hệ Quản Lý Nhân Sự & Sơ Đồ Tổ Chức (People Management) Trong Admin CMS

> **Trạng thái**: Đã thống nhất kiến trúc (Consensus Reached)  
> **Ngày lập**: 08/10/2026  
> **Mục tiêu**: Bổ sung phân hệ quản lý nhân sự toàn diện trong `app/(admin)/admin/people` và đồng bộ hiển thị động với `app/(public)/people`.

---

## 1. Quyết Định Kiến Trúc Đã Thống Nhất (Architecture Consensus)

1. **Lưu trữ dữ liệu (Data Persistence)**:
   - Sử dụng **PostgreSQL** kết hợp **Prisma ORM** trên database `egead_db`.
   - Đồng bộ hoàn toàn với hệ thống Blog CMS và Better Auth session đã triển khai.
   - Hình ảnh chân dung nhân sự được tải và quản lý trực tiếp qua **Cloudinary API** (`upload.service.ts`).

2. **Quản lý Sơ đồ Đội ngũ (Squad Tree / Hierarchy)**:
   - **Tách riêng một màn hình Quản lý Sơ đồ Tổ chức độc lập** tại route `/admin/people/hierarchy`.
   - Màn hình này cho phép chọn từng Lãnh đạo cấp cao, thiết lập phạm vi phụ trách (`departmentScope`), định hướng chiến lược (`overview`), quản lý danh sách các Squad con (`squadName`, `squadFocus`, `levelTag`, `responsibility`) và phân bổ chuyên gia vào từng Squad một cách trực quan, rõ ràng.

3. **Chuẩn thiết kế Admin (Design Standards)**:
   - Bắt buộc tuân thủ 100% quy tắc trong `AGENTS.md`:
     - **Không sử dụng** `capitalize`, `uppercase`, và các utility `tracking-*`.
     - **Không đặt** icon dính liền trước chữ (`<Icon /> Text`).
     - Sử dụng trọn vẹn thư viện **Astryx Design (`@astryxdesign/core`)**: `Button`, `Badge`, `Card`, `EmptyState`, `Field`, `FieldLabel`.

---

## 2. Thiết Kế Cơ Sở Dữ Liệu (Prisma Schema Specification)

Bổ sung 2 model mới vào [prisma/schema.prisma](file:///d:/Develop/Egead-Company/egead-company/prisma/schema.prisma):

```prisma
// -------------------------------------------------------------
// E-GEAD People & Organization Models
// -------------------------------------------------------------

model TeamMember {
  id          String   @id @default(cuid())
  name        String
  role        String
  department  String   // 'Executive Leadership' | 'Technology & AI' | 'Commerce & Solutions' | 'Fulfillment & Operations' | 'Delivery & Growth'
  location    String   // Ví dụ: 'Singapore / Global', 'Tokyo, Japan', 'Buon Ma Thuot, Vietnam'
  quote       String?
  image       String   // URL ảnh Cloudinary
  linkedin    String?
  bio         String   @db.Text
  skills      String[] // Postgres native text array
  isLeader    Boolean  @default(false)
  order       Int      @default(0)
  status      String   @default("published") // 'published' | 'draft' | 'archived'
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  hierarchy   LeaderHierarchy?

  @@index([department])
  @@index([isLeader])
  @@index([status])
  @@map("team_member")
}

model LeaderHierarchy {
  id              String     @id @default(cuid())
  leaderId        String     @unique
  leader          TeamMember @relation(fields: [leaderId], references: [id], onDelete: Cascade)
  departmentScope String
  overview        String     @db.Text
  childNodes      Json       // Lưu trữ mảng ChildNode[] (Squad Leads, squads, và sub-members)
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@map("leader_hierarchy")
}
```

---

## 3. Kiến Trúc Tuyến Đường & Màn Hình Giao Diện (Admin Routes)

### 3.1. Danh mục Menu Sidebar (`components/admin/AdminSidebar.tsx`)
Bổ sung nhóm điều hướng mới:
```typescript
const PEOPLE_NAV_ITEMS = [
  {
    label: 'Danh sách nhân sự',
    href: '/admin/people',
    icon: Users,
    exact: true,
  },
  {
    label: 'Thêm nhân sự mới',
    href: '/admin/people/new',
    icon: UserPlus,
    exact: false,
  },
  {
    label: 'Sơ đồ tổ chức & Squads',
    href: '/admin/people/hierarchy',
    icon: GitFork, // hoặc Network, FolderTree
    exact: false,
  },
];
```

### 3.2. Màn hình 1: Danh sách nhân sự (`/admin/people/page.tsx`)
- **Header**: Tiêu đề "Quản lý Đội ngũ & Nhân sự", nút bấm `Button` "Thêm nhân sự mới", thống kê tổng quan (Tổng số thành viên, Số lãnh đạo, Số chuyên gia, Đang hiển thị).
- **Bộ lọc & Tìm kiếm**:
  - Ô tìm kiếm theo tên, chức danh, kỹ năng, địa điểm.
  - Tab lọc theo phòng ban: *Tất cả*, *Lãnh đạo*, *Technology & AI*, *Commerce & Solutions*, *Fulfillment & Operations*, *Delivery & Growth*.
  - Bộ lọc trạng thái: *Tất cả*, *Đang hiển thị*, *Bản nháp*.
- **Bảng dữ liệu (Table view)**:
  - Cột: Ảnh đại diện (Avatar), Họ và tên, Chức danh & Phòng ban (`Badge`), Phân loại (`Badge` Lãnh đạo / Chuyên gia), Địa điểm, Thứ tự hiển thị, Thao tác (Chỉnh sửa, Xem trước, Xóa).
  - Trạng thái trống dùng component `EmptyState` của Astryx Design.

### 3.3. Màn hình 2: Tạo & Chỉnh sửa hồ sơ (`/admin/people/new` & `/admin/people/[id]`)
- **Khối thông tin chính (`Card`)**:
  - `Field` Họ và tên nhân sự (bắt buộc).
  - `Field` Chức danh / Vai trò (bắt buộc).
  - `Field` Khối phòng ban (Dropdown chọn 5 khối chuẩn).
  - `Field` Địa điểm làm việc (quốc gia/thành phố).
  - Switch phân loại: "Nhân sự thuộc Ban Lãnh đạo Cấp cao (Leadership Team)".
- **Khối truyền thông & Kỹ năng (`Card`)**:
  - Upload ảnh chân dung qua Cloudinary (có preview ảnh, nút xóa ảnh, kéo thả).
  - `Field` Đường dẫn LinkedIn cá nhân.
  - `Field` Trích dẫn triết lý làm việc (`quote`).
  - `Field` Danh sách kỹ năng chuyên môn (`skills`): Tag input tương tác, thêm/xóa tag linh hoạt.
  - `Field` Tiểu sử tóm tắt (`bio`): Khối văn bản mô tả kinh nghiệm chuyên môn.

### 3.4. Màn hình 3: Quản lý Sơ đồ Tổ chức & Squads (`/admin/people/hierarchy`)
- **Khối chọn Lãnh đạo**: Dropdown chọn 1 trong các Lãnh đạo (`isLeader = true`).
- **Khối thiết lập phạm vi**:
  - `Field` Phạm vi phòng ban (`departmentScope`).
  - `Field` Tổng quan chiến lược (`overview`).
- **Khối quản lý danh sách Squads**:
  - Danh sách các card Squad con (Accordion/Card).
  - Mỗi Squad bao gồm:
    - Tên Squad (`squadName`), Trọng tâm nghiệp vụ (`squadFocus`).
    - Nhãn cấp bậc (`levelTag`, ví dụ: "Trưởng nhóm phụ trách / Squad Lead").
    - Chọn nhân sự làm Squad Lead từ danh mục thành viên.
    - Trách nhiệm trọng tâm của Lead (`responsibility`).
  - **Danh sách thành viên trực thuộc Squad (`children`)**:
    - Chọn thêm thành viên từ database vào Squad.
    - Thiết lập phân công nhiệm vụ cụ thể (`responsibility`) cho từng thành viên trong Squad.
    - Xóa/thay đổi vị trí thành viên.
  - Nút bấm thêm mới Squad, sắp xếp thứ tự các Squad.

---

## 4. Đặc Tả API Backend (`app/api/admin/people/...`)

1. `GET /api/admin/people`:
   - Truy vấn danh sách nhân sự có hỗ trợ phân trang (`page`, `limit`), lọc theo `department`, `isLeader`, `status`, tìm kiếm từ khóa `search`.
2. `POST /api/admin/people`:
   - Tạo nhân sự mới, tự động validate trường bắt buộc (`name`, `role`, `department`, `image`).
3. `GET /api/admin/people/[id]`:
   - Lấy thông tin chi tiết một nhân sự kèm sơ đồ tổ chức (nếu là Leader).
4. `PUT /api/admin/people/[id]`:
   - Cập nhật thông tin nhân sự.
5. `DELETE /api/admin/people/[id]`:
   - Xóa hồ sơ nhân sự (cascade xóa sơ đồ liên quan nếu có).
6. `GET /api/admin/people/hierarchy?leaderId=...`:
   - Lấy cấu trúc Squad Tree của một Lãnh đạo.
7. `POST /api/admin/people/hierarchy`:
   - Lưu hoặc cập nhật cấu trúc Squad Tree của Lãnh đạo.

---

## 5. Kế Hoạch Chuyển Đổi Dữ Liệu Hiện Có (Migration & Seed Plan)

- Viết script `scripts/seed-people.mjs`:
  - Đọc 7 lãnh đạo từ `leadershipTeam` trong `peopleData.ts`.
  - Đọc 28 chuyên gia từ `allExperts` trong `peopleData.ts`.
  - Đọc cấu trúc cây từ `leaderTeamHierarchy` trong `leaderTeamData.ts`.
  - Nạp toàn bộ vào bảng `team_member` và `leader_hierarchy` trên PostgreSQL `egead_db`.
- Đảm bảo khi admin mở trang `/admin/people` lần đầu tiên, hệ thống đã có sẵn toàn bộ dữ liệu 35 nhân sự và các sơ đồ hiện tại để quản trị ngay mà không bị trống.

---

## 6. Lộ Trình Triển Khai Chi Tiết (Implementation Roadmap)

| Giai đoạn | Nội dung công việc | Kết quả đầu ra |
|---|---|---|
| **Phase 1** | Cập nhật `prisma/schema.prisma`, chạy `prisma db push`, tạo service `lib/services/people.service.ts` và script `seed-people.mjs`. | Database sẵn sàng, dữ liệu cũ được di trú an toàn. |
| **Phase 2** | Xây dựng các route API RESTful trong `app/api/admin/people/` và `app/api/public/people/`. | API CRUD hoàn chỉnh và bảo mật với Better Auth. |
| **Phase 3** | Cập nhật Sidebar và xây dựng trang danh sách `/admin/people` + form tạo mới/sửa `/admin/people/[id]`. | Quản trị viên thêm/sửa/xóa nhân sự dễ dàng. |
| **Phase 4** | Xây dựng màn hình chuyên biệt Quản lý Sơ đồ Tổ chức `/admin/people/hierarchy`. | Quản trị viên cấu hình Squads và phân quyền phụ trách trực quan. |
| **Phase 5** | Nối dữ liệu động vào trang người dùng `app/(public)/people` và viết bộ unit test hoàn chỉnh. | Trang People công khai chạy dữ liệu sống từ DB, test pass 100%. |

---

## 7. Rủi Ro & Biện Pháp Kiểm Soát (Risks & Mitigations)

| Rủi ro tiềm ẩn | Biện pháp giảm thiểu |
|---|---|
| Cấu trúc JSON của Sơ đồ Tổ chức phức tạp gây lỗi parse | Định nghĩa chặt chẽ TypeScript type và Zod validation cho `ChildNode` và `SubChildNode` trước khi ghi vào database. |
| Tải ảnh dung lượng lớn làm chậm trang | Tận dụng Cloudinary transformation (tự động resize và chuyển định dạng webp/avif) có sẵn trong `upload.service.ts`. |
| Ảnh hưởng giao diện public `/people` khi chưa có dữ liệu | Trang public luôn có fallback về static data nếu database tạm thời không phản hồi. |
