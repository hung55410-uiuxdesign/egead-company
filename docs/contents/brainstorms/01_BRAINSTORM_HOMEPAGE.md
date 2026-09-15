# BRAINSTORM CHI TIẾT: TRANG CHỦ (HOMEPAGE)
> **Trang đích**: `app/page.tsx` và các component con liên quan  
> **Dữ liệu cấu hình**: `data/homepage.json`  
> **Tham chiếu chuẩn**: Nội dung trực tiếp từ [https://egeadcompany.com/](https://egeadcompany.com/)  
> **Nguyên tắc kỹ thuật**: Giữ nguyên 100% cấu trúc thẻ, class Tailwind, layout component, id thẻ DOM; chỉ thay đổi chuỗi text, media URL, liên kết đích và thông số dữ liệu phù hợp.

---

## 1. Phân tích Hiện trạng & Mục tiêu Chuyển đổi

### 1.1. Hiện trạng Component Trang Chủ
Trang chủ hiện tại render theo luồng tuyến tính:
```tsx
<div className="w-full">
  <HeroBanner />
  <ServicesSection />
  <CaseStudiesSection />
  <SmartCXSection />
  <PartnerSlider />
  <TestimonialsSection />
  <InsightsSection />
  <CultureSection />
  <ContactBlock />
</div>
```
Tất cả các component này hiện mang nội dung của **SAI Digital (Concentrix)** (tư vấn giải pháp chuyển đổi trải nghiệm khách hàng B2B, SAP Commerce Cloud, Concentrix acquisition).

### 1.2. Mục tiêu Chuyển đổi Nội dung
Biến toàn bộ Trang chủ thành một phễu bán lẻ & giải pháp công nghệ B2B đỉnh cao dành cho **nhà bán lẻ xuyên biên giới (Cross-border Sellers)**, với trọng tâm là:
1. **Khẩu hiệu cốt lõi**: "AUTOMATE OPERATIONS, SCALE GLOBAL SALES".
2. **Năng lực cốt lõi**: Sản xuất in POD tại Mỹ hoàn tất <24h, Giá trọn gói từ $6, Tuân thủ SLA TikTok Shop US 100%, Đồng bộ đa kênh (Amazon, Etsy, Shopify, TikTok Shop), Ads chuyển đổi ROAS 4.8x.
3. **Bộ sản phẩm Eweb Suite**: Eweb-character, Eweb-platform, Eweb-builder.
4. **Đối tác**: Toàn bộ hệ thống sàn thương mại điện tử lớn nhất thế giới.

---

## 2. Chi tiết Chuyển đổi Từng Thành phần (Section-by-Section)

### 2.1. Hero Banner (`components/HeroBanner.tsx`)

#### A. Announcement Pill (Thanh thông báo trung tâm)
- **Nội dung cũ**: `SAI DIGITAL IS NOW A CONCENTRIX COMPANY` (link tới `/articles/Concentrix-Acquires-SAI-Digital`).
- **Nội dung mới**: 
  ```html
  <span className="group inline-flex items-center gap-2 ...">
    <img src="/assets/icon.svg" alt="" className="w-3.5 h-3.5 object-contain" />
    <span>
      US POD FULFILLMENT · <span className="underline decoration-[#10E774] font-bold text-white group-hover:text-[#10E774]">FULFILLED IN UNDER 24 HOURS</span>
    </span>
  </span>
  ```
  - *Link đích*: `/speedx` (hoặc `/contact-us`).
  - *Lý do*: Thông báo tính năng nổi trội nhất của E-GEAD: sản xuất hoàn tất trong vòng 24 giờ tại Mỹ với giá trọn gói $6 all-in.

#### B. Main Hero Typography & Heading
- **Nội dung cũ**:
  - H1: `BUILD FASTER. RUN SMARTER. SCALE GLOBALLY.`
  - P: `We help leading enterprises design, build, run, and grow intelligent experiences`
- **Nội dung đề xuất mới (Khớp 100% style & màu nhấn `#10E774`)**:
  - H1:
    ```tsx
    <h1 className="font-montserrat font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight uppercase leading-[1.08] text-white max-w-5xl">
      AUTOMATE <span className="text-[#10E774]">OPERATIONS.</span>
      <br />
      SCALE <span className="text-[#10E774]">GLOBAL SALES.</span>
    </h1>
    ```
  - P:
    ```tsx
    <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-[#b3b3b3] font-normal max-w-3xl leading-relaxed font-montserrat">
      Unify your order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.
    </p>
    ```
  - *Phương án Tiếng Việt (nếu bật chế độ VN)*:
    - H1: `TỰ ĐỘNG HÓA VẬN HÀNH. BỨT PHÁ DOANH THU TOÀN CẦU.`
    - P: `Đồng bộ quản lý đơn hàng đa kênh, tự động hóa quy trình vận hành đa sàn và kiểm soát tồn kho thời gian thực — tối ưu chi phí và tăng tốc tăng trưởng doanh thu.`

#### C. Live Local Time & Clock
- Giữ nguyên cơ chế đồng hồ thời gian thực (`live local time`), format trực quan giờ AM/PM.

#### D. Nguồn tư liệu 5 Slide Hero trên web gốc để bổ sung / luân phiên (Rotating Copy)
Web gốc `egeadcompany.com` có 5 slide trình chiếu:
1. **Slide 1 (Tổng quan)**: "Automate Operations, Scale Global Sales" – Đồng bộ đa sàn, cắt giảm chi phí.
2. **Slide 2 (US POD)**: "US Print-on-Demand Fulfilled in Under 24 Hours" – Sản xuất trọn gói từ $6, công nghệ in 23-inch, chuẩn hóa TikTok Shop US.
3. **Slide 3 (Ads)**: "Scale Your Retail With Performance Digital Ads" – Thúc đẩy chuyển đổi cao, mở rộng traffic quốc tế, ROAS 4.8x.
4. **Slide 4 (API)**: "Seamless Integration Via RESTful API Infrastructure" – Kết nối trực tiếp WMS qua webhooks thời gian thực, độ tin cậy chuẩn doanh nghiệp.
5. **Slide 5 (Pricing)**: "Transparent Pricing, Instant Landed Cost Estimates" – Dự toán cước in ấn và vận chuyển, kiểm soát tuyệt đối biên lợi nhuận ròng.

---

### 2.2. Khối Dịch vụ Chủ lực (`components/ServicesSection.tsx`)

#### A. Header Section
- **Subtitle**: `CAPABILITIES & ECOSYSTEM` (thay vì `Services`).
- **H2 Title**:
  - Cũ: `Complete CX transformation capabilities.`
  - Mới: `End-to-End <span className="text-[#10E774]">E-Commerce Growth</span> Ecosystem.`
- **CTA Link**: `Explore All Capabilities` -> `/services/all-services`.

#### B. Ma trận 4 Thẻ Dịch vụ Cốt lõi (Giữ nguyên cấu trúc 4 card grid, `min-h-[380px]`)

| Card # | Tiêu đề Mới (Title) | Mô tả Mới (Description) | Đường dẫn (Href) | Icon đề xuất |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **US POD Fulfillment** | Sản xuất 24H tại Mỹ, công nghệ in khổ lớn 23-inch, chuẩn hóa SLA TikTok Shop US, giá trọn gói từ $6/unit không phí ẩn. | `/speedx` | `/assets/home-icon__1_.svg` (In ấn/Sản phẩm) |
| **02** | **Sales Automation** | Tự động đồng bộ luồng đơn hàng và tồn kho đa sàn thời gian thực (Amazon, Etsy, Shopify, eBay, TikTok Shop). | `/smartcommerce` | `/assets/home-icon__2_.svg` (Đồng bộ/Tự động) |
| **03** | **Digital Growth Marketing** | Tối ưu hóa chiến dịch quảng cáo chuyển đổi trên Meta, Google, TikTok Ads; bứt phá ROAS 4.8x và mở rộng thị trường US/EU. | `/services/all-services` | `/assets/home-icon__3_.svg` (Tăng trưởng/Marketing) |
| **04** | **Developers Hub & WMS** | Hệ thống Open RESTful API & Real-time Webhooks kết nối kho bãi WMS, tính cước vận chuyển tự động, chính xác 99.9%. | `/services/all-services` | `/assets/home-icon__4_.svg` (Hạ tầng API/Kho) |

---

### 2.3. Khối Dự án Điển hình (`components/CaseStudiesSection.tsx`)

Chuyển đổi 4 nghiên cứu tình huống từ tập đoàn B2B cũ sang các Seller & Thương hiệu bán lẻ quốc tế thực chiến:

1. **Case Study 1 (TikTok Shop US Apparel Brand)**:
   - *Client*: **UrbanVibe Apparel (TikTok Shop US)**
   - *Title*: **Hoàn tất 100% đơn hàng dưới 24h & Giữ vững chứng chỉ TikTok Shop Fast Dispatch**
   - *Description*: Ứng dụng công nghệ in khổ lớn 23-inch và quy trình quét mã vạch WMS của E-GEAD giúp thương hiệu đạt tỷ lệ trễ hạn 0%, an toàn tài khoản tuyệt đối trong đợt Mega Campaign 2026.
   - *Metrics*: `SLA < 24 Hours`, `0% Late Dispatch`, `+180% Doanh thu Q4`.
2. **Case Study 2 (Multi-Marketplace Cross-Border Store)**:
   - *Client*: **HomeCraft Studio (Amazon, Etsy & Shopify)**
   - *Title*: **Tự động hóa luồng đơn hàng và đồng bộ tồn kho đa kênh thời gian thực**
   - *Description*: Xóa bỏ 100% tình trạng hủy đơn và overselling khi bán đồng thời trên 3 sàn quốc tế, tiết kiệm 12 giờ nhập liệu thủ công mỗi ngày nhờ Eweb-platform.
   - *Metrics*: `99.9% Độ chính xác WMS`, `-85% Thời gian xử lý`, `3 Sàn đồng bộ tức thì`.
3. **Case Study 3 (Scale Performance Marketing US/EU)**:
   - *Client*: **Lumina Pod Merch (US & UK Markets)**
   - *Title*: **Bứt phá ROAS lên 4.8x và mở rộng quy mô thị trường Âu - Mỹ với Performance Ads**
   - *Description*: Tối ưu hóa phễu chuyển đổi bằng dữ liệu hành vi người tiêu dùng, hạ chi phí thu hút khách hàng (CPA) xuống $8.4 và gia tăng giá trị đơn hàng trung bình (AOV).
   - *Metrics*: `ROAS 4.8x`, `CPA $8.4`, `+34% Traffic MoM`.
4. **Case Study 4 (Enterprise API Fulfillment & WMS Routing)**:
   - *Client*: **PrintWave Enterprise (Custom OMS & Store Network)**
   - *Title*: **Tích hợp Open RESTful API xử lý 10,000+ đơn hàng POD mỗi ngày**
   - *Description*: Kết nối hệ thống quản trị đơn hàng riêng của khách hàng trực tiếp với hệ thống xưởng in tại Mỹ qua Webhooks, nhận mã tracking tự động sau 12 giờ.
   - *Metrics*: `10,000+ Đơn/Ngày`, `Uptime 99.9%`, `Thời gian phản hồi API < 150ms`.

---

### 2.4. Khối Giải Pháp Độc Quyền (`components/SmartCXSection.tsx`)

#### A. Định vị lại từ "SmartCX" sang "Eweb Suite"
Component này có thiết kế rất sang trọng với badge, tiêu đề, đoạn văn mô tả và video/ảnh minh họa dashboard.
- **Badge Subtitle**: `PROPRIETARY TECHNOLOGY` (Công nghệ độc quyền).
- **Tiêu đề H2**:
  - Cũ: `Intelligent solutions for specific challenges.`
  - Mới: `Intelligent Automation <span className="text-[#10E774]">For Global Sellers</span>.`
- **Đoạn văn mô tả (Description)**:
  - Cũ: "40+ intelligent modules built from 15 years of enterprise commerce experience. Each addresses specific challenges with measurable impact: 93% demand forecasting accuracy..."
  - Mới: 
    > **"Hệ sinh thái Eweb độc quyền của E-GEAD kết hợp bộ ba: Eweb-character (AI API tự động chuẩn hóa địa chỉ quốc tế, kiểm soát rủi ro và điều phối lệnh sản xuất POD gần nhất), Eweb-platform (Bảng điều khiển trung tâm đồng bộ đa sàn và đối soát doanh thu tự động), và Eweb-builder (Dựng Storefront chuẩn SEO Âu - Mỹ tốc độ cao). Đảm bảo chuẩn hóa SLA vận hành, giảm tối đa tỷ lệ hoàn hàng (RTO) và nâng độ chính xác lên 99.9%."**
- **Nút CTA**: `Khám phá Hệ sinh thái Eweb` -> `/smartcommerce`.
- **Ảnh minh họa / Mockup**: Laptop hiển thị giao diện dashboard Eweb (`/images/egead/platform/laptop.png` hoặc `/assets/smartcx-2.png`).

---

### 2.5. Thanh Trượt Đối Tác Sàn Thương Mại (`components/PartnerSlider.tsx`)

#### A. Thay thế hệ sinh thái đối tác
- **Cũ**: SAP, Adobe, Sitecore, Salesforce, commercetools (các phần mềm doanh nghiệp B2B cũ).
- **Mới**: Các sàn TMĐT, cổng thanh toán và nền tảng quảng cáo số 1 thế giới mà E-GEAD tích hợp:
  1. **Amazon** (`https://egeadcompany.com/images/egead/partners/amazon.svg`)
  2. **TikTok Shop** (`https://egeadcompany.com/images/egead/partners/tiktok.svg`)
  3. **Etsy** (`https://egeadcompany.com/images/egead/partners/etsy.svg`)
  4. **Shopify** (`https://egeadcompany.com/images/egead/partners/shopify.svg`)
  5. **eBay** (`https://egeadcompany.com/images/egead/partners/ebay.svg`)
  6. **WooCommerce** (`https://egeadcompany.com/images/egead/partners/woocommerce.svg`)
  7. **Google** (`https://egeadcompany.com/images/egead/partners/google.svg`)
  8. **Meta** (`https://egeadcompany.com/images/egead/partners/meta.svg`)
- **Dòng thông điệp**: *"Trusted and integrated with leading global e-commerce platforms"* (Tích hợp và đồng hành cùng các nền tảng thương mại hàng đầu).

---

### 2.6. Khối Đánh Giá Của Nhà Bán Hàng (`components/TestimonialsSection.tsx`)

Chuyển đổi nhận xét thành tiếng nói thực tế từ những người bán hàng quốc tế (Voices of Our Sellers):

1. **Review 1**:
   - *Trích dẫn*: "Nền tảng AI phân tích xu hướng của E-GEAD liên tục cập nhật dữ liệu từ Amazon và TikTok Shop, giúp xưởng POD của chúng tôi đón đầu các mẫu thiết kế hot trend. Tốc độ sản xuất dưới 24h tại Mỹ đảm bảo tài khoản TikTok Shop US luôn giữ huy hiệu Top Seller."
   - *Tên & Chức vụ*: **Alexandre Nguyen** — Founder, Cross-Border Apparel Brand (US & Vietnam).
2. **Review 2**:
   - *Trích dẫn*: "Trước đây việc quản lý tồn kho và đối soát đơn hàng trên 4 sàn (Amazon, Etsy, eBay, Shopify) là cơn ác mộng thủ công. Từ khi kết nối Eweb-platform, mọi đơn hàng đều tự động đồng bộ và đẩy thẳng vào quy trình sản xuất WMS với độ chính xác 99.9%."
   - *Tên & Chức vụ*: **David Miller** — E-Commerce Operations Lead, HomeDecor US.
3. **Review 3**:
   - *Trích dẫn*: "Mức giá trọn gói $6 all-in cùng công cụ tính cước minh bạch giúp chúng tôi kiểm soát chính xác 100% biên lợi nhuận ròng trước khi chạy quảng cáo. Đội ngũ Ads của E-GEAD cũng tối ưu ROAS đạt 4.8x."
   - *Tên & Chức vụ*: **Sarah Jenkins** — Head of Growth, Lumina DTC Store (UK & AU).

---

### 2.7. Khối Tin Tức & Góc Nhìn Chuyên Gia (`components/InsightsSection.tsx`)

Hiển thị 3 bài viết chuyên sâu về thương mại điện tử quốc tế:
1. **Bài viết 1**: *Global Market Expansion: Chiến lược mở rộng thị trường Mỹ và Châu Âu cho seller Việt Nam năm 2026.* (Tag: `Strategy` · 5 mins read).
2. **Bài viết 2**: *Bảo vệ an toàn tài khoản TikTok Shop US: Tiêu chuẩn SLA vận hành và quy trình sản xuất POD dưới 24H.* (Tag: `Compliance` · 6 mins read).
3. **Bài viết 3**: *Tự động hóa WMS và Đồng bộ đơn hàng đa kênh: Giải pháp xóa sổ lỗi quá tải mùa Q4.* (Tag: `Technology` · 7 mins read).
- **Link**: `/insights`.

---

### 2.8. Khối Văn Hóa & Số Liệu Doanh Nghiệp (`components/CultureSection.tsx`)

Cập nhật trực tiếp số liệu thực tế từ [egeadcompany.com](https://egeadcompany.com/):
- **Tiêu đề**: `"We are more than just an operational partner; we drive comprehensive growth through an automation technology ecosystem, US-standard POD production, and global scaling."`
- **Subtitle**: `Our Scale & Impact` (Quy mô & Ảnh hưởng).
- **Khối chỉ số chính (Main Block)**:
  - Giá trị: **100+**
  - Nhãn: `Projects Delivered` (Dự án bàn giao thành công).
- **Khối chỉ số phụ (Sub Block)**:
  - Giá trị: **20+**
  - Nhãn: `Global Business Partners` (Đối tác quốc tế).
- **Các chỉ số mở rộng**:
  - `10+ Countries Reached` (Mỹ, Anh, Đức, Úc, Canada, Pháp, Việt Nam...).
  - `99% Client Satisfaction` (Tỷ lệ hài lòng).
  - `99.9% WMS & Uptime` (Độ ổn định và chính xác).
- **Nút hành động**:
  - Main button: `About E-GEAD` -> `/company`.
  - Sub button: `Careers` -> `/career`.

---

### 2.9. Khối Kêu Gọi Hành Động Cuối Trang (`components/ContactBlock.tsx`)

- **Tiêu đề**:
  ```html
  <p>Let's <strong>automate</strong> your <br />
  e-commerce operations.</p>
  ```
  *(Cùng tự động hóa vận hành và bứt phá doanh số bán lẻ toàn cầu của bạn)*
- **Nút CTA**: `Get Free Consultation` (Nhận tư vấn miễn phí) -> `/contact-us`.

---

## 3. Bản Đồ Từ Khóa SEO Trang Chủ (Keyword Integration Plan)

| Vị trí Text trên Trang chủ | Từ khóa Tích hợp Tự nhiên |
| :--- | :--- |
| **Hero Title & Body** | `Automate Operations`, `Scale Global Sales`, `order management`, `multi-marketplace workflows`, `real-time inventory sync` |
| **Hero Announcement Pill** | `US Print-on-Demand`, `Fulfilled under 24 hours`, `TikTok Shop US compliant` |
| **Services 4 Cards** | `US POD Fulfillment`, `23-inch large-format printing`, `$6 all-in pricing`, `Multi-channel sync`, `WMS barcode accuracy`, `ROAS 4.8x`, `Open RESTful API` |
| **Case Studies** | `TikTok Shop Fast Dispatch SLA`, `Amazon Etsy Shopify sync`, `CPA optimization`, `Real-time webhooks tracking` |
| **SmartCX / Eweb Suite** | `Eweb-character`, `Eweb-platform`, `Eweb-builder`, `AI order normalization`, `address validation`, `RTO reduction` |
| **Culture / Stats** | `100+ Projects Delivered`, `20+ Global Partners`, `Cross-border scaling` |
