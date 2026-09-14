# BRAINSTORM CHI TIẾT: TRANG GIỚI THIỆU CÔNG TY (ABOUT / COMPANY)
> **Trang đích**: `app/company/page.tsx`  
> **Tham chiếu chuẩn**: Nội dung trực tiếp từ [https://egeadcompany.com/about](https://egeadcompany.com/about) và thông tin doanh nghiệp E-GEAD  
> **Nguyên tắc kỹ thuật**: Giữ nguyên 100% cấu trúc thẻ, icon (`HeartHandshake`, `Shield`, `Lightbulb`, `Globe2`), grid Tailwind 4 cột số liệu và 2 cột giá trị cốt lõi; chỉ tinh chỉnh và nâng cấp toàn bộ nội dung text, thông số số liệu, tag nhận diện thương hiệu.

---

## 1. Phân tích Hiện trạng & Mục tiêu Thay thế

### 1.1. Hiện trạng Codebase cũ
- Mang thông tin công ty cũ **SAI Digital (Concentrix Company)**:
  - Tự giới thiệu là tập đoàn 15 năm kinh nghiệm về SAP Commerce Cloud.
  - Số liệu: 200+ kỹ sư, 8 văn phòng quốc tế (Singapore, Tokyo, Sydney...).
  - Khẩu hiệu: *"Transform Today, Lead Tomorrow"*.
  - Huy hiệu ảnh banner: *"CONCENTRIX DIGITAL COMMERCE HUB"*.

### 1.2. Nhận diện Thực tế của E-GEAD Company
- **Tên doanh nghiệp**: Công ty E-GEAD (E-GEAD Company).
- **Vị trí địa lý thực tế**:
  - Trụ sở công nghệ & điều hành: Số 217/9 Đường Ngô Quyền, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam.
  - Mạng lưới vận hành & kho xưởng: Hệ thống xưởng in Print-on-Demand khổ lớn 23-inch và kho WMS tại Hoa Kỳ (US Fulfillment Hub).
- **Sứ mệnh doanh nghiệp**:
  > *"More than an operations partner — we drive comprehensive growth through an automation technology ecosystem, US-standard Print-on-Demand (POD) production, and global market expansion."*  
  > (Không chỉ là một đối tác vận hành; chúng tôi thúc đẩy sự tăng trưởng toàn diện thông qua hệ sinh thái công nghệ tự động hóa, sản xuất POD chuẩn Mỹ và mở rộng thị trường quốc tế).
- **Phạm vi thị trường**: Phục vụ hàng trăm nhà bán hàng cross-border tại hơn 10 quốc gia (Mỹ, Anh, Đức, Úc, Canada, Pháp, Việt Nam...).

---

## 2. Chi tiết Chuyển đổi Từng Thành phần trong `app/company/page.tsx`

### 2.1. Metadata & SEO Headers
- **Title cũ**: `Company | SAI Digital: Transform Today, Lead Tomorrow`
- **Title mới**: `About Us | E-GEAD: More Than An Operations Partner`
- **Description cũ**: `Learn about SAI Digital history, leadership, engineering culture, and our strategic global footprint as a Concentrix Company.`
- **Description mới**: `E-GEAD is based in Buon Ma Thuot, Vietnam, empowering cross-border e-commerce brands across 10+ countries with US POD fulfillment in under 24 hours, WMS automation, and global sales scaling.`
- **Keywords**: `E-GEAD Company`, `About E-GEAD`, `Buon Ma Thuot E-commerce`, `US POD fulfillment partner`, `cross-border operations`.

---

### 2.2. Khối Hero Header (`mb-20 sm:mb-28`)

```tsx
<section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
  <div className="max-w-4xl">
    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#7ceee0] block mb-4">
      About E-GEAD
    </span>
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
      MORE THAN AN OPERATIONS PARTNER, <br />
      <span className="text-[#7ceee0]">DRIVING GLOBAL SCALE.</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
      E-GEAD is an all-in-one logistics, automation technology, and digital growth platform based in Buon Ma Thuot, Vietnam. We empower e-commerce brands and cross-border sellers across 10+ countries to automate workflows, fulfill US print-on-demand orders in under 24 hours, and sustainably expand into global marketplaces.
    </p>
  </div>
</section>
```

- **Bản dịch đối sánh Tiếng Việt**:
  - *Subtitle*: `Về Chúng Tôi`
  - *H1*: `KHÔNG CHỈ LÀ ĐỐI TÁC VẬN HÀNH, CHÚNG TÔI THÚC ĐẨY TĂNG TRƯỞNG TOÀN CẦU.`
  - *P*: `E-GEAD là nền tảng công nghệ tự động hóa, hậu cần logistics và tăng trưởng bán lẻ đa kênh có trụ sở tại Buôn Ma Thuột, Việt Nam. Chúng tôi đồng hành cùng các thương hiệu và seller quốc tế tại hơn 10 quốc gia nhằm tự động hóa quy trình vận hành, hoàn tất sản xuất POD tại Mỹ dưới 24 giờ và mở rộng quy mô thị phần quốc tế bền vững.`

---

### 2.3. Khối Ảnh Banner Chính (`mb-24`)

- **Ảnh minh họa**: Giữ nguyên `/assets/company.png` (hoặc ảnh xưởng in công nghệ cao/team E-GEAD).
- **Alt text**: `E-GEAD Operations & Engineering Hub`
- **Huy hiệu Overlay (Pill badge)**:
  - Cũ: `CONCENTRIX DIGITAL COMMERCE HUB`
  - Mới: `BUON MA THUOT HQ & US FULFILLMENT NETWORK` *(Trụ sở Buôn Ma Thuột & Mạng lưới Fulfillment tại Mỹ)*

---

### 2.4. Khối Số Liệu & Thành Tựu Thực Tế (4 Cột Grid)

Cập nhật chính xác số liệu công bố trên website chính thức [egeadcompany.com](https://egeadcompany.com/):

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 sm:p-12 rounded-[32px] bg-[#141718] border border-white/10 text-center">
  {/* Cột 1 */}
  <div>
    <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">100+</span>
    <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">
      Projects Delivered
    </p>
    <span className="text-[11px] text-gray-500 block mt-1">Dự án triển khai thành công</span>
  </div>

  {/* Cột 2 */}
  <div>
    <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">20+</span>
    <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">
      Global Business Partners
    </p>
    <span className="text-[11px] text-gray-500 block mt-1">Đối tác kinh doanh quốc tế</span>
  </div>

  {/* Cột 3 */}
  <div>
    <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">10+</span>
    <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">
      Countries Reached
    </p>
    <span className="text-[11px] text-gray-500 block mt-1">Mỹ, Anh, Đức, Úc, Canada...</span>
  </div>

  {/* Cột 4 */}
  <div>
    <span className="text-4xl sm:text-5xl font-black text-[#7ceee0] font-mono">99%</span>
    <p className="text-xs sm:text-sm text-gray-400 mt-2 font-semibold uppercase tracking-wider">
      Client Satisfaction
    </p>
    <span className="text-[11px] text-gray-500 block mt-1">Mức độ hài lòng dịch vụ</span>
  </div>
</div>
```

---

### 2.5. Khối Giá Trị Cốt Lõi (Our DNA / Core Values)

Giữ nguyên 4 thẻ bo tròn với icon tương ứng (`HeartHandshake`, `Shield`, `Lightbulb`, `Globe2`), cập nhật nội dung phản ánh triết lý kinh doanh thực tế của E-GEAD:

```tsx
const values = [
  {
    title: 'Automation-First Ecosystem',
    desc: 'Chúng tôi tin rằng tự động hóa là chìa khóa sống còn của thương mại điện tử hiện đại. Từ chuẩn hóa địa chỉ AI, đồng bộ đơn hàng đa sàn thời gian thực đến điều phối lệnh in WMS, E-GEAD loại bỏ 99% sai sót thủ công của con người.',
    icon: Lightbulb,
  },
  {
    title: 'Sub-24H Fulfillment SLA',
    desc: 'Tốc độ là sự khác biệt lớn nhất. Quy trình in ấn công nghệ khổ lớn 23-inch tại Mỹ cho phép chúng tôi hoàn tất đơn hàng trong vòng dưới 24 giờ, bảo vệ an toàn 100% các tiêu chuẩn vận hành khắt khe của TikTok Shop US, Amazon và Etsy.',
    icon: Shield,
  },
  {
    title: 'Absolute Financial Transparency',
    desc: 'Kinh doanh bền vững dựa trên sự minh bạch. E-GEAD cam kết bảng giá sản xuất trọn gói từ $6/unit không phát sinh phụ phí ẩn, tích hợp công cụ dự toán cước in/ship và đối soát tài chính tức thì theo thời gian thực.',
    icon: HeartHandshake,
  },
  {
    title: 'Global Scale with Local Dedication',
    desc: 'Được sáng lập và vận hành bởi đội ngũ kỹ sư tâm huyết tại Buôn Ma Thuột (Việt Nam) kết hợp mạng lưới đối tác kho vận tại Hoa Kỳ, chúng tôi mang trí tuệ công nghệ Việt phụng sự hàng nghìn nhà bán hàng trên toàn cầu.',
    icon: Globe2,
  },
];
```

- **Tiêu đề khối DNA**:
  - Subtitle: `Our DNA & Philosophy`
  - H2: `Principles that power our automation and global fulfillment.`  
    *(Những nguyên tắc định hình nền tảng tự động hóa và chuỗi cung ứng toàn cầu của E-GEAD)*

---

### 2.6. Khối Kêu Gọi Hành Động (`ContactBlock`)
- Được kế thừa liền mạch để dẫn người dùng tới form nhận tư vấn miễn phí cho kế hoạch mở rộng thị trường hoặc tích hợp API xưởng in.

---

## 3. Tóm tắt Lợi ích Sau Khi Chuyển Đổi
1. **Loại bỏ 100% dấu vết thương hiệu cũ (SAI Digital / Concentrix)**.
2. **Khẳng định danh tính bản địa và năng lực toàn cầu**: Trụ sở Buôn Ma Thuột, phục vụ thị trường Mỹ, Châu Âu, Úc.
3. **Định vị rõ ràng**: E-GEAD là đơn vị tiên phong về tự động hóa bán lẻ và POD tại Mỹ, hoàn toàn khác biệt với các agency tư vấn ERP truyền thống.
4. **Bảo toàn 100% giao diện, phong cách thẩm mỹ và không gây xung đột responsive**.
