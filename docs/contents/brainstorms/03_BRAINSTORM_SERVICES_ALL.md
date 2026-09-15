# BRAINSTORM CHI TIẾT: TRANG DỊCH VỤ TOÀN DIỆN (ALL SERVICES)
> **Trang đích**: `app/services/all-services/page.tsx`  
> **Tham chiếu chuẩn**: Mục "Our Services & Solutions Portfolio" từ [https://egeadcompany.com/](https://egeadcompany.com/) và [https://egeadcompany.com/solutions](https://egeadcompany.com/solutions)  
> **Nguyên tắc kỹ thuật**: Giữ nguyên 100% cấu trúc thẻ, layout container, thẻ card bo tròn lớn `rounded-[36px]`, khối sub-services 3 cột (`grid-cols-1 md:grid-cols-3`); chỉ nâng cấp mảng dữ liệu `servicePillars` và tiêu đề Hero.

---

## 1. Phân tích Hiện trạng & Danh mục Dịch vụ Chuẩn của E-GEAD

### 1.1. Hiện trạng Codebase cũ
Trang dịch vụ hiện đang chia thành 4 mảng của tập đoàn IT cũ:
1. *Strategy & Design* (Tư vấn chiến lược tổng thể B2B)
2. *Data & Analytics* (Mô hình AI dự báo nhu cầu bán sỉ)
3. *Enterprise Technology* (Triển khai SAP Commerce Cloud, commercetools)
4. *Commerce & CX Operations* (Vận hành 24/7 cho tập đoàn lớn)

### 1.2. Danh mục Dịch vụ Thực tế của E-GEAD Company
Trang web chính thức của E-GEAD định nghĩa rõ ràng **6 Dịch vụ & Giải pháp Tăng trưởng cốt lõi**:
1. **Sales Automation**: Tự động hóa toàn bộ quy trình bán hàng đa kênh từ tiếp nhận đơn, xác nhận, đồng bộ dữ liệu thời gian thực giữa các nền tảng, cắt giảm tối đa chi phí nhân sự và sai sót thủ công.
2. **POD Marketplace Integration**: Kết nối và đồng bộ API hai chiều an toàn giữa hệ thống vận hành với các sàn TMĐT quốc tế (Amazon, eBay, Etsy, TikTok Shop,...), tự động đẩy đơn vào quy trình sản xuất POD và trả mã vận đơn (tracking number) tức thì.
3. **Fulfillment Automation**: Quản lý và tự động hóa chuỗi cung ứng hậu cần, theo dõi đơn hàng thời gian thực, điều phối xưởng in/kho bãi tối ưu, cập nhật tồn kho tự động với độ chính xác WMS 99.9%.
4. **E-Commerce Platform**: Xây dựng và triển khai nền tảng bán lẻ trực tuyến tốc độ cao, hỗ trợ tùy biến linh hoạt, quản trị danh mục sản phẩm tập trung và tích hợp cổng thanh toán quốc tế đa dạng.
5. **Website & Hosting Management**: Giải pháp phát triển website chuyên nghiệp với giao diện tối ưu trải nghiệm (UI/UX), chuẩn SEO, vận hành trên hạ tầng máy chủ đám mây bảo mật cao, đảm bảo tốc độ tải trang cực nhanh và uptime liên tục 99.9%.
6. **Digital Advertising Services**: Triển khai chiến dịch quảng cáo kỹ thuật số đa kênh (Meta Ads, Google Ads, TikTok Ads,...), tối ưu hóa ROAS (4.8x) và chi phí chuyển đổi (CPA $8.4), giúp thương hiệu bứt phá doanh số tại thị trường Mỹ và Châu Âu.

---

## 2. Chi tiết Cập nhật Giao diện & Nội dung trong `app/services/all-services/page.tsx`

### 2.1. Metadata & SEO Headers
```tsx
export const metadata = {
  title: 'Our Services | E-GEAD: End-to-End E-Commerce & POD Solutions',
  description: 'Explore E-GEAD comprehensive capabilities across Sales Automation, POD Marketplace Integration, Fulfillment Automation, E-Commerce Platforms, and Digital Ads.',
};
```

---

### 2.2. Hero Header

```tsx
<section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
  <div className="max-w-4xl">
    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#5EFC8D] block mb-4">
      Services & Solutions Portfolio
    </span>
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
      AUTOMATE OPERATIONS, <br />
      SCALE <span className="text-[#5EFC8D]">GLOBAL COMMERCE.</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
      E-GEAD mang đến hệ sinh thái giải pháp trọn vẹn từ tự động hóa quy trình bán hàng, tích hợp sàn TMĐT quốc tế, hoàn tất sản xuất POD tại Mỹ dưới 24 giờ đến bứt phá doanh số bằng quảng cáo hiệu suất cao.
    </p>
  </div>
</section>
```

---

### 2.3. Cấu trúc Mảng Dữ liệu Dịch vụ Mới (`servicePillars`)

Nhằm bảo toàn 100% phong cách hiển thị card lớn `rounded-[36px]`, ta thiết lập danh mục 6 dịch vụ chuẩn tương thích tuyệt đối với component:

```tsx
const servicePillars = [
  {
    id: 'sales-automation',
    number: '01',
    title: 'Sales Automation',
    desc: 'Tự động hóa toàn diện quy trình bán lẻ đa kênh từ tiếp nhận khách hàng, kiểm duyệt đơn hàng tự động, đồng bộ dữ liệu thời gian thực giữa các sàn, loại bỏ 99% sai sót thủ công.',
    icon: '/assets/home-icon__1_.svg',
    subServices: [
      {
        name: 'Đồng Bộ Đơn Hàng Đa Sàn',
        description: 'Tự động thu thập và tập trung hóa đơn hàng từ Amazon, Etsy, TikTok Shop, Shopify và WooCommerce về một luồng điều phối duy nhất.',
      },
      {
        name: 'Kiểm Soát Tồn Kho Thời Gian Thực',
        description: 'Cập nhật số lượng tồn kho tức thì trên tất cả các kênh bán hàng ngay khi có giao dịch mới, chấm dứt hoàn toàn nguy cơ overselling.',
      },
      {
        name: 'Tự Động Hóa Chăm Sóc & CSKH',
        description: 'Thiết lập luồng thông báo tiến độ đơn hàng tự động qua email, SMS và tin nhắn sàn giúp giảm thiểu tỷ lệ hoàn đơn và khiếu nại.',
      },
    ],
  },
  {
    id: 'pod-marketplace-integration',
    number: '02',
    title: 'POD Marketplace Integration',
    desc: 'Kết nối và đồng bộ API hai chiều an toàn giữa gian hàng với hệ thống xưởng in công nghệ cao tại Mỹ, tự động đẩy lệnh in và cập nhật tracking tức thì.',
    icon: '/assets/home-icon__2_.svg',
    subServices: [
      {
        name: 'Tích Hợp API Sàn Quốc Tế',
        description: 'Kết nối chuẩn hóa với TikTok Shop US, Amazon FBM, Etsy và eBay, tuân thủ nghiêm ngặt các chính sách thuật toán và SLA của sàn.',
      },
      {
        name: 'Tự Động Đẩy File In Khổ Lớn 23-inch',
        description: 'Chuyển đổi và kiểm tra chất lượng file in đồ họa tự động, đẩy lệnh in trực tiếp đến hệ thống máy in khổ lớn 23-inch hiện đại.',
      },
      {
        name: 'Đồng Bộ Tracking & Bảo Vệ SLA',
        description: 'Tự động cập nhật mã vận đơn (tracking number) lên sàn trong vòng 12-24 giờ, đảm bảo tỷ lệ hoàn tất đơn đúng hạn 100%.',
      },
    ],
  },
  {
    id: 'fulfillment-automation',
    number: '03',
    title: 'Fulfillment Automation',
    desc: 'Hệ thống quản lý kho WMS và chuỗi cung ứng tự động hóa, theo dõi đơn hàng thời gian thực với độ chính xác quét mã vạch đạt 99.9%.',
    icon: '/assets/home-icon__3_.svg',
    subServices: [
      {
        name: 'Quản Trị Kho WMS Bằng Mã Vạch',
        description: 'Kiểm soát từng phôi sản phẩm, vật tư và kiện hàng bằng mã vạch số hóa, nâng độ chính xác đóng gói và dán nhãn lên 99.9%.',
      },
      {
        name: 'Định Tuyến Xưởng In Tối Ưu',
        description: 'Thuật toán tự động định tuyến đơn hàng đến cơ sở sản xuất và trạm trung chuyển gần khách hàng nhất để rút ngắn thời gian giao hàng.',
      },
      {
        name: 'Giá Trọn Gói $6 All-In Không Phí Ẩn',
        description: 'Định phí sản xuất và hoàn tất rõ ràng, tích hợp công cụ tính landed cost và đối soát biên lợi nhuận ròng minh bạch.',
      },
    ],
  },
  {
    id: 'ecommerce-platform',
    number: '04',
    title: 'E-Commerce Platform',
    desc: 'Xây dựng và tối ưu hóa nền tảng gian hàng trực tuyến (Storefront) tốc độ cao, giao diện chuẩn UI/UX quốc tế và sẵn sàng tích hợp API fulfillment E-GEAD.',
    icon: '/assets/home-icon__4_.svg',
    subServices: [
      {
        name: 'Storefront Chuẩn SEO Thị Trường US/EU',
        description: 'Thiết kế giao diện mua sắm hiện đại, tốc độ tải trang dưới 1.5 giây, tối ưu trải nghiệm người dùng mobile-first.',
      },
      {
        name: 'Tối Ưu Tỷ Lệ Chuyển Đổi (CRO)',
        description: 'Quy trình checkout 1 bước tinh gọn, bổ sung các huy hiệu tin cậy (trust badges) và gợi ý sản phẩm bán kèm thông minh (upsell).',
      },
      {
        name: 'Tích Hợp Cổng Thanh Toán Đa Tiền Tệ',
        description: 'Hỗ trợ thanh toán toàn cầu qua Stripe, PayPal, Apple Pay, Google Pay và chuyển khoản nội địa an toàn tuyệt đối.',
      },
    ],
  },
  {
    id: 'website-hosting-management',
    number: '05',
    title: 'Website & Hosting Management',
    desc: 'Hạ tầng máy chủ đám mây doanh nghiệp bảo mật cao, đảm bảo website luôn hoạt động ổn định 24/7 ngay cả trong các đợt flash sale cao điểm.',
    icon: '/assets/home-icon__1_.svg',
    subServices: [
      {
        name: 'Hosting Doanh Nghiệp Uptime 99.9%',
        description: 'Hạ tầng đám mây tự động co giãn (auto-scaling) trên AWS / Cloudflare, chịu tải hàng triệu lượt truy cập mà không gián đoạn.',
      },
      {
        name: 'Bảo Mật Chuẩn Doanh Nghiệp',
        description: 'Chứng chỉ SSL cao cấp, tường lửa chống tấn công DDoS, sao lưu dữ liệu tự động hàng ngày và cô lập mã độc.',
      },
      {
        name: 'Giám Sát Kỹ Thuật 24/7',
        description: 'Đội ngũ kỹ thuật túc trực liên tục phát hiện và xử lý sự cố tức thì, đảm bảo gian hàng không bao giờ bỏ lỡ doanh thu.',
      },
    ],
  },
  {
    id: 'digital-advertising-services',
    number: '06',
    title: 'Digital Advertising Services',
    desc: 'Chiến dịch quảng cáo kỹ thuật số hiệu suất cao trên Meta, Google và TikTok Ads, bứt phá tỷ lệ chuyển đổi và mở rộng quy mô thị trường toàn cầu.',
    icon: '/assets/home-icon__2_.svg',
    subServices: [
      {
        name: 'Quảng Cáo Chuyển Đổi TikTok & Meta Ads',
        description: 'Chiến lược sáng tạo video ngắn bắt trend, tối ưu thuật toán đấu thầu nhằm gia tăng tỷ lệ chốt đơn và đạt ROAS trung bình 4.8x.',
      },
      {
        name: 'Google Shopping & Performance Max',
        description: 'Tiếp cận khách hàng có ý định mua sắm cao tại Mỹ, Anh, Úc qua mạng lưới Google Search, Shopping và YouTube Ads.',
      },
      {
        name: 'Chiến Lược Mở Rộng Thị Trường Quốc Tế',
        description: 'Nghiên cứu thị hiếu tiêu dùng bản địa, thử nghiệm ngách sản phẩm tiềm năng và scale ngân sách quảng cáo bền vững.',
      },
    ],
  },
];
```

---

## 3. Tác Động & Giá Trị Mang Lại
1. **Khớp 100% dịch vụ quảng bá trên [egeadcompany.com](https://egeadcompany.com/)**: Nhà bán hàng khi xem trang dịch vụ sẽ thấy đúng những thứ họ cần tìm (in ấn POD Mỹ, đồng bộ đơn hàng, chạy ads bán hàng quốc tế, làm web bán hàng).
2. **Cung cấp thông tin chi tiết, thuyết phục**: Mỗi dịch vụ có 3 tiểu mục con với giải thích rõ ràng về mặt kỹ thuật và giá trị kinh doanh.
3. **Cải thiện SEO Onpage**: Chứa đầy đủ các thực thể tìm kiếm quan trọng như `POD fulfillment`, `WMS barcode`, `TikTok Shop US SLA`, `Multi-channel sync`, `ROAS 4.8x`.
