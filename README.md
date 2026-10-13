# E-GEAD (Concentrix Company) - Enterprise Digital Commerce Website & Blog CMS

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.7-black?style=for-the-badge)](https://better-auth.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3-FBF0DF?style=for-the-badge&logo=bun)](https://bun.sh/)

A pixel-perfect, high-performance enterprise digital commerce web platform and **Blog CMS Portal** modeled after **[SAI Digital](https://www.sai-digital.com/)** (A Concentrix Company), engineered with **Next.js 16**, **React 19**, **Prisma ORM**, **Better Auth**, and **Turbopack**.

---

## 🌟 Highlights & Features

- **Fluid Full-Width Layout**: Designed for modern ultra-wide displays down to mobile devices without artificial container constraints, featuring tailored edge-to-edge spacing (`px-6 sm:px-10 lg:px-14 xl:px-16`).
- **Brand Typography & Color Harmony**:
  - Fonts: **Rubik** (Headings) & **Montserrat** (Body text & Subtitles).
  - Primary Accents: Signature cyan (`#5EFC8D` / `#10E774`) set against sleek dark backgrounds (`#0A0D0E`, `#141718`).
- **Real-Time Global APAC Clocks**: Dynamic local clocks for 7 regional delivery hubs: Singapore, Japan, Australia, Hong Kong, Vietnam, South Korea, and India.
- **Enterprise Blog CMS & Admin Portal (`/admin`)**:
  - **Prisma ORM + MySQL**: Lưu trữ dữ liệu bài viết, chuyên mục, tài khoản quản trị.
  - **Better Auth Authentication**: Hệ thống đăng nhập bảo mật với phiên làm việc 7 ngày, bảo vệ các trang `/admin/*`.
  - **TipTap Rich Text Editor**: Trình soạn thảo văn bản trực quan (WYSIWYG) hỗ trợ H1-H3, Bold, Italic, Bullet/Number Lists, Blockquote, Link, Image, xem trước Live Preview và chỉnh sửa mã HTML.
- **Complete Enterprise Pages**:
  - `Home (/)`: Hero banner, 4 Core Service Pillars, Case Studies slider, SmartCX showcase, Testimonials, Insights list, Culture, and Contact CTA.
  - `Our Work (/our-work)`: Filterable case studies portfolio across Consumer Goods, Manufacturing, Finance, and Electronics.
  - `Company (/company)`: Mission, global team presence, core values, and key stats.
  - `Our People (/people)`: Leadership governance, industry experts directory, quotes, and culture in motion showcase.
  - `Services (/services/all-services)`: Detailed breakdown of Strategy & Design, Enterprise Technology, Data & Analytics, and CX Operations.
  - `SmartCommerce (/smartcommerce)` & `SpeedX (/speedx)`: Proprietary AI modules and acceleration engines.
  - `Testimonials (/testimonial)`: Enterprise customer reviews and testimonials.
  - `Insights (/insights)` & `Article Details (/articles/[slug])`: Thought leadership articles with rich HTML support.
  - `Admin Portal (/admin)`: Bảng điều khiển quản trị, danh sách bài viết, tạo mới và chỉnh sửa bài viết.

---

## 🚀 Hướng Dẫn Thiết Lập Khi Clone Về Máy Mới (Setup on New Machine)

Khi bạn chuyển sang máy tính mới hoặc clone project từ GitHub về, hãy thực hiện theo các bước sau:

### 1. Yêu cầu môi trường (Prerequisites)
- **Node.js**: Phiên bản 20+ hoặc [Bun](https://bun.sh/) 1.3+
- **MySQL**: Cài đặt MySQL 8+ trên máy (XAMPP, Laragon, Docker, hoặc MySQL Community Server).

### 2. Cài đặt các thư viện (Install Dependencies)
```bash
# Clone repository
git clone git@github.com:hung55410-uiuxdesign/egead-company.git
cd egead-company

# Cài đặt thư viện bằng npm hoặc bun
npm install
# hoặc: bun install
```

### 3. Cấu hình biến môi trường (.env)
Tạo file `.env` từ file mẫu `.env.example`:
```bash
cp .env.example .env
```
Mở file `.env` và cập nhật biến `DATABASE_URL` theo MySQL của máy bạn:
```env
# MySQL trên máy local (tạo database `egead` trước)
DATABASE_URL="mysql://root:root@localhost:3306/egead"

# XAMPP / Laragon thường dùng mật khẩu trống:
# DATABASE_URL="mysql://root@localhost:3306/egead"

# Better Auth Secret (tối thiểu 32 ký tự)
BETTER_AUTH_SECRET="egead-super-secret-auth-key-production-ready-2026-secure"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Khởi tạo Database & Dữ liệu mẫu (Database Migration & Seed)
Tạo database MySQL trước (một lần):
```sql
CREATE DATABASE egead CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Chạy các lệnh sau để Prisma tạo bảng và cấp tài khoản Admin:
```bash
# 1. Sinh Prisma Client
npm run prisma:generate

# 2. Tạo cấu trúc bảng vào MySQL (user, session, account, post, category)
npm run prisma:push

# 3. Nạp dữ liệu mẫu ban đầu (Bài viết & Tài khoản admin)
npm run prisma:seed
```

> **Ghi chú tiện lợi**: Trang đăng nhập `/admin/login` đã tích hợp sẵn tính năng tự động nhận diện và tạo cấu trúc bảng (Auto-DDL) kèm nút *"Khởi tạo tài khoản Admin & Cấu trúc bảng (Seed)"*.

### 5. Thông tin tài khoản Quản trị mặc định (Admin Credentials)
- **Đường dẫn**: `http://localhost:3000/admin/login`
- **Email**: `admin@egead.com`
- **Mật khẩu**: `Admin@123456`
- **Vai trò**: `admin`

### 6. Khởi chạy ứng dụng (Run Locally)
```bash
# Chạy môi trường phát triển (Dev server)
npm run dev
# hoặc: bun run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt.

### 7. Deploy bằng Docker trên Linux Server

Source mới thay thế source Laravel/PHP cũ bằng stack **Next.js + MySQL**. File `docker-compose.yml` vẫn giữ tên container `egead_app`, image `egeadcompanywebsite_app`, port host mặc định `8080`, và network proxy external `egeadcompanywebsite_default` để dễ map vào reverse proxy hiện có.

```bash
# 1. Tạo file môi trường production
cp .env.docker.example .env

# 2. Sửa .env: domain, BETTER_AUTH_SECRET, mật khẩu MySQL, Cloudinary
nano .env

# 3. Nếu server chưa có network proxy cũ thì tạo một lần
docker network create egeadcompanywebsite_default

# 4. Build và chạy app. MySQL local chỉ bật khi cần:
# docker compose --profile local-db up -d --build
docker compose up -d --build

# 5. Nối egead_app vào mạng của Nginx cũ và reload proxy
sh docker/setup-proxy.sh

# 6. Tạo bảng MySQL và nạp dữ liệu mẫu
docker compose exec app npm run prisma:push
docker compose exec app npm run prisma:seed
```

Nginx trong container `egead_app` lắng nghe port `80` và chuyển tiếp sang Next.js ở `127.0.0.1:3000`. Host map port này qua `APP_PORT`, mặc định là `8080`. Container `egead-nginx` nhận domain và chuyển tiếp tới `http://egead_app:80`.

### 8. Chạy Unit Tests
```bash
npm test
# hoặc: bun test
```

---

## 📦 Danh Sách Lệnh (Available Scripts)

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Khởi động server phát triển với Turbopack tại port `3000` |
| `npm run build` | Tự động sinh Prisma Client và biên dịch bản Production tối ưu |
| `npm run start` | Khởi chạy bản Production build trên máy cục bộ |
| `npm run lint` | Kiểm tra cú pháp và coding standards với ESLint 9 |
| `npm test` | Chạy toàn bộ các bài Unit Tests cho services và components |
| `npm run prisma:generate` | Tạo TypeScript client từ `schema.prisma` |
| `npm run prisma:push` | Đẩy trực tiếp schema vào cơ sở dữ liệu MySQL |
| `npm run prisma:seed` | Nạp tài khoản Admin và danh sách bài viết mẫu vào DB |

---

## 📁 Cấu Trúc Thư Mục (Project Structure)

```text
├── app/
│   ├── (admin)/admin/          # Hệ thống quản trị Admin Portal (Astryx UI)
│   │   ├── blogs/              # Quản lý danh sách, tạo mới (/new) và sửa bài viết (/[id])
│   │   ├── categories/         # Quản lý chuyên mục bài viết
│   │   ├── login/              # Trang đăng nhập xác thực Better Auth
│   │   └── settings/           # Cấu hình hệ thống
│   ├── (public)/               # Các trang công khai cho khách hàng
│   │   ├── articles/[slug]/    # Trang chi tiết bài viết (Rich HTML & fallback)
│   │   ├── insights/           # Danh mục tin tức & bài viết
│   │   ├── our-work/           # Portfolio & Case studies
│   │   ├── services/           # Dịch vụ chiến lược & công nghệ
│   │   └── page.tsx            # Trang chủ E-GEAD
│   ├── api/
│   │   ├── admin/blogs/        # REST API quản trị bài viết (CRUD)
│   │   ├── admin/bootstrap/    # Endpoint khởi tạo & chẩn đoán database
│   │   └── auth/[...all]/      # Route handler Better Auth
├── components/
│   ├── admin/                  # Components quản trị (TipTapEditor, Navbar, Sidebar)
│   └── ...                     # Components trang chủ & giao diện public
├── lib/
│   ├── prisma.ts               # Singleton Prisma Client kết nối MySQL
│   ├── auth.ts                 # Better Auth server configuration
│   ├── auth-client.ts          # Better Auth client hooks (useSession, signIn, signOut)
│   └── services/               # Blog Service & Auth Service
├── prisma/
│   └── schema.prisma           # Prisma Schema (User, Session, Post, Category)
├── scripts/
│   └── seed.mjs                # Script nạp dữ liệu ban đầu
└── tests/                      # Unit tests cho services và components
```

---

## 📄 License

Private & Proprietary. All trademarks and brand assets belong to their respective owners.
