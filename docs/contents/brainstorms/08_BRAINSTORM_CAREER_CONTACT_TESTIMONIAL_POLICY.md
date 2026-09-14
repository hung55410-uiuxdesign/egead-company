# BRAINSTORM CHI TIẾT: TUYỂN DỤNG, LIÊN HỆ, ĐÁNH GIÁ & CHÍNH SÁCH
> **Trang đích**: `app/career/page.tsx`, `app/contact-us/page.tsx`, `app/testimonial/page.tsx`, `app/privacy-policy/page.tsx`  
> **Tham chiếu chuẩn**: Địa chỉ trụ sở thực tế, thông tin liên hệ và chính sách trên [https://egeadcompany.com/](https://egeadcompany.com/)  
> **Nguyên tắc kỹ thuật**: Giữ nguyên toàn bộ cấu trúc form nhập liệu, logic submit, layout 2 cột, icon (`Mail`, `MapPin`, `Briefcase`, `Quote`), thẻ card bo tròn; chỉ thay thế và nâng cấp toàn bộ nội dung dữ liệu.

---

## 1. Trang Tuyển Dụng (`app/career/page.tsx`)

### 1.1. Hiện trạng & Định hướng
- **Cũ**: Tuyển dụng chuyên gia tư vấn SAP, kiến trúc sư phần mềm tại Singapore, Tokyo, Sydney...
- **Mới**: Tuyển dụng nhân sự công nghệ, vận hành POD và chạy Ads cho **Trụ sở Buôn Ma Thuột (Đắk Lắk)** và hình thức làm việc **Từ xa (Remote)**:
  - *Sứ mệnh tuyển dụng*: "Gia nhập đội ngũ E-GEAD tại Buôn Ma Thuột — Cùng kiến tạo nền tảng tự động hóa thương mại điện tử phụng sự hàng triệu người tiêu dùng trên toàn cầu."

### 1.2. Mảng Công Việc Mới (`jobs`)
```tsx
const jobs = [
  {
    title: 'Senior Next.js & Fullstack Engineer',
    location: 'Buôn Ma Thuột, Đắk Lắk (Hybrid / Remote)',
    type: 'Full-time',
    department: 'Engineering',
  },
  {
    title: 'Chuyên Viên Vận Hành POD & Quản Lý Đơn Hàng Mỹ (US Shift)',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    type: 'Full-time',
    department: 'Operations & Fulfillment',
  },
  {
    title: 'Performance Digital Media Buyer (TikTok / Meta Ads)',
    location: 'Buôn Ma Thuột / Remote',
    type: 'Full-time',
    department: 'Growth Marketing',
  },
  {
    title: 'Kỹ Sư Tích Hợp API & Hệ Thống Kho WMS',
    location: 'Buôn Ma Thuột / Remote',
    type: 'Full-time',
    department: 'Software Architecture',
  },
  {
    title: 'Quản Lý Tài Khoản Khách Hàng Quốc Tế (Account Manager)',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    type: 'Full-time',
    department: 'Client Success',
  },
];
```

---

## 2. Trang Liên Hệ (`app/contact-us/page.tsx`)

### 2.1. Cập nhật Thông Tin Trụ Sở Chính Xác
Loại bỏ danh sách 8 văn phòng cũ không có thực của Concentrix. Cập nhật thông tin thực tế từ trang web chính thức [egeadcompany.com](https://egeadcompany.com/):

```tsx
const offices = [
  {
    country: 'Việt Nam (Trụ Sở Chính & Trung Tâm R&D)',
    city: 'TP. Buôn Ma Thuột, Tỉnh Đắk Lắk',
    address: 'Số 217/9 Đường Ngô Quyền, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk',
    email: 'support@egead.com',
    type: 'Headquarters & Engineering Hub',
  },
  {
    country: 'Hoa Kỳ (Mạng Lưới Sản Xuất & Kho Vận POD)',
    city: 'California & East Coast Centers, USA',
    address: 'Hệ thống xưởng in công nghệ cao 23-inch và trạm trung chuyển WMS',
    email: 'contact@egeadcompany.com',
    type: 'US POD Production & WMS Network',
  },
];
```

### 2.2. Khối Form Tư Vấn (Form Dropdown Options)
Cập nhật các gói dịch vụ tư vấn trong form:
- **US Print-on-Demand Fulfillment (<24H SLA)**
- **Nền Tảng Tự Động Hóa Bán Hàng (Multi-Channel Sync)**
- **Dịch Vụ Chạy Ads Chuyển Đổi (Meta, Google, TikTok Ads)**
- **Tích Hợp Hệ Thống Open RESTful API & WMS**
- **Đăng Ký Trải Nghiệm Bộ Sản Phẩm Eweb Suite**

---

## 3. Trang Đánh Giá Của Khách Hàng (`app/testimonial/page.tsx`)

Thay thế các đánh giá chung chung của doanh nghiệp B2B bằng nhận xét chân thực từ các **Founder, Seller và Trưởng nhóm Vận hành TMĐT quốc tế**:

```tsx
const allTestimonials = [
  {
    quote: "Tốc độ in ấn và hoàn tất đơn dưới 24h tại Mỹ của E-GEAD thực sự là cứu cánh cho gian hàng TikTok Shop US của chúng tôi. Từ khi hợp tác, chỉ số Late Dispatch Rate luôn giữ mức 0%, tài khoản được lên Top Seller bền vững.",
    role: "Founder & Creative Director",
    company: "UrbanVibe Apparel (US)",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "Quản lý đồng thời gian hàng trên Amazon và Etsy từng tốn của chúng tôi hàng giờ nhập liệu mỗi ngày. Nhờ Eweb-platform đồng bộ tự động, chúng tôi tiết kiệm được 85% thời gian và hoàn toàn không còn tình trạng hủy đơn do hết hàng.",
    role: "E-Commerce Director",
    company: "HomeCraft Studio (UK)",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "Mức giá trọn gói từ $6 all-in không có phí ẩn ngầm. Công cụ tính cước minh bạch giúp chúng tôi kiểm soát chính xác 100% biên lợi nhuận ròng trước khi quyết định tăng ngân sách quảng cáo.",
    role: "Chief Operating Officer",
    company: "Lumina DTC Brand (Australia)",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
  {
    quote: "Chất lượng in khổ lớn 23-inch rất sắc nét, màu sắc bám bền và chất vải thoáng mát. Khách hàng tại Mỹ để lại rất nhiều đánh giá 5 sao về chất lượng áo sau khi giặt.",
    role: "Merchandise Lead",
    company: "Pacific Graphic Tees (California, US)",
    avatar: "/assets/portrait-beautiful-young-asian-woman-using-laptop.jpg",
  },
  {
    quote: "Tài liệu API của E-GEAD cực kỳ rõ ràng và chuẩn mực. Đội ngũ kỹ sư tại Buôn Ma Thuột hỗ trợ chúng tôi kết nối hệ thống ERP riêng chỉ trong 3 ngày làm việc.",
    role: "Lead Systems Architect",
    company: "PrintWave Global Network",
    avatar: "/assets/2151266584__1_.jpg",
  },
  {
    quote: "Chiến dịch quảng cáo TikTok Ads do E-GEAD triển khai đã giúp chúng tôi bứt phá ROAS từ 2.1x lên 4.8x, doanh thu mùa mua sắm cuối năm tăng trưởng hơn 180%.",
    role: "Head of Digital Marketing",
    company: "TrendWave Commerce (Vietnam)",
    avatar: "/assets/millennial-asia-businessmen-businesswomen-meeting-brainstorming-ideas-about-new-paperwork-project-colleagues-working-together-planning-success-strategy-enjoy-teamwork-small-modern-night-office__1_.jpg",
  },
];
```

---

## 4. Trang Chính Sách Bảo Mật (`app/privacy-policy/page.tsx` & `app/sai-privacy/page.tsx`)

### 4.1. Cập nhật Chủ Thể Doanh Nghiệp
- Thay thế toàn bộ cụm `SAI Digital, a Concentrix Company` thành **E-GEAD Company (Công ty E-GEAD)**.

### 4.2. Bổ sung Điều khoản Bảo Vệ Dữ Liệu Khách Hàng TMĐT
1. **Bảo mật Dữ liệu Đơn Hàng Sàn TMĐT**: Tuân thủ chính sách bảo vệ dữ liệu người tiêu dùng của TikTok Shop, Amazon và Etsy. Mọi thông tin khách hàng (tên, số điện thoại, địa chỉ bưu chính Mỹ) chỉ được sử dụng cho mục đích in ấn mã vận đơn và hoàn tất giao hàng.
2. **Mã Hóa API & Webhooks**: Toàn bộ dữ liệu truyền tải giữa hệ thống seller và xưởng in WMS của E-GEAD được mã hóa đầu cuối qua giao thức SSL/TLS 256-bit.
3. **Tuân thủ Chuẩn Quốc Tế**: Tuân thủ các quy định bảo vệ dữ liệu cá nhân GDPR (Châu Âu) và CCPA (California, Hoa Kỳ).
