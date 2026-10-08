<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Quy chuẩn phát triển cho khu vực Admin (`app/(admin)`)

1. **Font chữ và Typography:**
   - TUYỆT ĐỐI KHÔNG sử dụng `capitalize`, `uppercase`, và các utility letter-spacing/tracking (`tracking-wider`, `tracking-widest`, `tracking-tight`, v.v.) cho font chữ trong dự án.
   - Luôn sử dụng kiểu chữ tự nhiên (sentence case / regular text), khoảng cách chữ tiêu chuẩn (normal letter-spacing).

2. **Quy tắc về Icon và Text (KHÔNG đặt icon trước text):**
   - TUYỆT ĐỐI KHÔNG sử dụng icon đứng trước text trong các badge, thẻ đếm, pill, table cell hay button như `<Icon /> Text` (như lỗi hiển thị icon trước "0 hồ sơ" làm chữ bị xuống dòng vỡ bố cục).
   - Thể hiện thông tin và số lượng bằng chữ rõ ràng, dùng component `Badge` hoặc `Button` chuẩn của Astryx Design.
   - Các nút thao tác hành động ưu tiên dùng nút text rõ ràng (`Button`) hoặc icon button riêng biệt (`isIconOnly`) có tooltip, không ghép icon dính liền trước chữ gây chật chội.

3. **Bắt buộc sử dụng các Component của Astryx Design (`@astryxdesign/core`):**
   - Mọi giao diện trong route admin PHẢI sử dụng triệt để các component có sẵn trong thư viện `@astryxdesign/core`:
     - `Button`: Cho toàn bộ nút bấm, liên kết hành động, điều hướng.
     - `Badge`: Cho hiển thị trạng thái (success, warning, error, neutral), số lượng hồ sơ, đếm số liệu, nhãn chuyên mục.
     - `Card`: Cho các container bọc nội dung, widget, khối form.
     - `EmptyState`: Cho các màn hình không có dữ liệu hoặc tìm kiếm rỗng.
     - `Field`, `FieldLabel`: Cho các trường form nhập liệu.
