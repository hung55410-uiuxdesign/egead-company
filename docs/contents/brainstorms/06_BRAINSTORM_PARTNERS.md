# BRAINSTORM CHI TIẾT: TRANG ĐỐI TÁC CÔNG NGHỆ & SÀN TMĐT (PARTNERS)
> **Trang đích**: `app/partners/page.tsx`  
> **Tham chiếu chuẩn**: Thanh đối tác "Trusted and integrated with leading platforms" trên [https://egeadcompany.com/](https://egeadcompany.com/)  
> **Nguyên tắc kỹ thuật**: Giữ nguyên grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`, cấu trúc thẻ card bo góc `rounded-[32px]`, badge level, logo inverting filter, và nút liên kết "Build on...".

---

## 1. Phân tích Hiện trạng & Định hướng Tái Cấu Trúc

### 1.1. Hiện trạng Codebase cũ
- Danh mục đối tác phần mềm doanh nghiệp cũ: *SAP Silver Partner*, *Shopify Plus*, *Sitecore*, *Stripe*, *Salesforce*, *commercetools*.
- Mô tả hướng tới các hợp đồng triển khai phần mềm cho tập đoàn đa quốc gia.

### 1.2. Hệ Sinh Thái Đối Tác Thực Tế Của E-GEAD
E-GEAD tích hợp sâu rộng với 3 nhóm đối tác chiến lược:
1. **Sàn Thương Mại Điện Tử Quốc Tế**: Amazon, TikTok Shop US, Etsy, eBay.
2. **Nền Tảng Storefront Bán Lẻ**: Shopify, WooCommerce.
3. **Mạng Lưới Tiếp Thị & Vận Chuyển Toàn Cầu**: Meta (Facebook/Instagram), Google, USPS / UPS / FedEx.

---

## 2. Chi tiết Cập nhật Giao diện & Dữ liệu trong `app/partners/page.tsx`

### 2.1. Metadata & SEO Headers
```tsx
export const metadata = {
  title: 'Our Strategic Partners | E-GEAD Company',
  description: 'Integrated and trusted by the world leading e-commerce platforms: Amazon, TikTok Shop US, Etsy, Shopify, eBay, Google, and Meta.',
};
```

---

### 2.2. Hero Header

```tsx
<section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-20 sm:mb-28">
  <div className="max-w-4xl">
    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#5EFC8D] block mb-4">
      Global Ecosystem
    </span>
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
      INTEGRATED WITH <br />
      <span className="text-[#5EFC8D]">LEADING PLATFORMS.</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
      E-GEAD kết nối trực tiếp với các sàn thương mại điện tử, nền tảng bán hàng và mạng lưới quảng cáo hàng đầu thế giới, mang đến cho nhà bán hàng một hạ tầng vận hành hợp nhất, an toàn và tự động hóa 100%.
    </p>
  </div>
</section>
```

---

### 2.3. Mảng Dữ liệu Đối Tác Mới (`partnerTiers`)

```tsx
const partnerTiers = [
  {
    name: 'TikTok Shop US',
    desc: 'Tích hợp API trực tiếp với TikTok Shop US, tự động đẩy mã vận đơn (tracking number) trong 12-24h, bảo vệ an toàn tài khoản tuyệt đối và duy trì tỷ lệ giao hàng đúng hạn 100%.',
    logo: 'https://egeadcompany.com/images/egead/partners/tiktok.svg',
    level: 'Certified SLA Partner',
    cta: 'Sell on TikTok Shop',
  },
  {
    name: 'Amazon',
    desc: 'Kết nối luồng đơn hàng Amazon FBM/POD, tự động đồng bộ số lượng tồn kho theo thời gian thực và quản lý đơn hàng xuyên biên giới chính xác với hệ thống WMS mã vạch.',
    logo: 'https://egeadcompany.com/images/egead/partners/amazon.svg',
    level: 'Marketplace Integration Partner',
    cta: 'Sell on Amazon',
  },
  {
    name: 'Etsy & eBay',
    desc: 'Đồng bộ danh mục sản phẩm POD, nhận diện đơn hàng đa biến thể tự động và hỗ trợ seller tối ưu hóa chi phí in ấn trọn gói $6/unit trên các sàn mua sắm thủ công lớn nhất.',
    logo: 'https://egeadcompany.com/images/egead/partners/etsy.svg',
    level: 'Multi-Channel Partner',
    cta: 'Sell on Etsy & eBay',
  },
  {
    name: 'Shopify & WooCommerce',
    desc: 'Kết nối tự động giữa Storefront trực tuyến với hệ thống xưởng in tại Mỹ của E-GEAD qua RESTful Webhooks, xử lý đơn hàng và trả tracking tự động ngay sau khi thanh toán.',
    logo: 'https://egeadcompany.com/images/egead/partners/shopify.svg',
    level: 'Storefront Platform Partner',
    cta: 'Connect Storefront',
  },
  {
    name: 'Meta & Google Ads',
    desc: 'Đối tác chiến dịch quảng cáo chuyển đổi kỹ thuật số trên Facebook, Instagram, Google Shopping và YouTube, tối ưu hóa ROAS 4.8x và tiếp cận khách hàng mục tiêu tại Mỹ & Châu Âu.',
    logo: 'https://egeadcompany.com/images/egead/partners/meta.svg',
    level: 'Certified Growth Partner',
    cta: 'Scale with Meta & Google',
  },
  {
    name: 'USPS & Major US Carriers',
    desc: 'Mạng lưới bưu chính và hãng vận chuyển hàng đầu Hoa Kỳ (USPS, UPS, FedEx), cam kết thời gian giao hàng nội địa từ 2-4 ngày với chi phí cước tối ưu nhất cho seller.',
    logo: 'https://egeadcompany.com/images/egead/partners/ebay.svg',
    level: 'Logistics & Carrier Network',
    cta: 'Calculate Shipping Rates',
  },
];
```

---

## 3. Lợi ích & Giá trị Chuyển đổi
1. **Trực tiếp củng cố niềm tin cho seller**: Nhìn thấy các logo thân thuộc (Amazon, TikTok Shop, Shopify, Etsy), khách hàng tiềm năng biết ngay hệ thống của E-GEAD tương thích trực tiếp với gian hàng của họ.
2. **Kêu gọi hành động thực tế**: Các nút liên kết "Sell on TikTok Shop", "Sell on Amazon", "Connect Storefront" định hướng người dùng đăng ký tích hợp gian hàng ngay lập tức.
3. **Giữ nguyên 100% bố cục và styling**: Thẻ card bo cong mềm mại, màu sắc hài hòa với nền đen `#0A0D0E` và màu nhấn ngọc lam `#5EFC8D`.
