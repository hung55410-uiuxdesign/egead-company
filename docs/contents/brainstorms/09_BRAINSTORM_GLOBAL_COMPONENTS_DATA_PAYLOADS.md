# BRAINSTORM CHI TIẾT: THÀNH PHẦN TOÀN CỤC & DỮ LIỆU CẤU HÌNH (GLOBAL COMPONENTS & JSON PAYLOADS)
> **Thành phần đích**: `app/layout.tsx`, `components/Header.tsx`, `components/Footer.tsx`, `components/MegaMenu.tsx`, `data/homepage.json`, `data/nav_tree.json`  
> **Tham chiếu chuẩn**: Header, Footer, Sitemap và thông tin doanh nghiệp trên [https://egeadcompany.com/](https://egeadcompany.com/)  
> **Nguyên tắc kỹ thuật**: Bảo toàn 100% logic tương tác (menu hover, mobile drawer, scroll effect, time zone live updater, schema JSON tương thích không làm gãy component).

---

## 1. Cập Nhật Root Layout (`app/layout.tsx`)

### 1.1. Metadata & OpenGraph
```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://egeadcompany.com'),
  title: 'E-GEAD — Automate Operations, Scale Global Sales',
  description:
    'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.',
  icons: {
    icon: 'https://egeadcompany.com/images/egead/logo.png',
  },
  openGraph: {
    title: 'E-GEAD — Automate Operations, Scale Global Sales',
    description:
      'Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time.',
    images: ['https://egeadcompany.com/images/egead/logo.png'],
    siteName: 'E-GEAD Company',
  },
};
```

---

## 2. Cập Nhật Header Navigation (`components/Header.tsx`)

### 2.1. Logo Header
- Thay thế ảnh logo cũ bằng logo chuẩn của E-GEAD:
  - `src="https://egeadcompany.com/images/egead/logo.png"`
  - `alt="E-GEAD — Automate Operations, Scale Global Sales"`

### 2.2. Danh Mục Điều Hướng (`NAV_ITEMS`)

Cập nhật danh mục thanh menu khớp với sơ đồ trang web chính thức của E-GEAD:

```tsx
const NAV_ITEMS: NavItem[] = [
  {
    label: 'Solutions',
    href: '/services/all-services',
    children: [
      { label: 'All Services & Capabilities', href: '/services/all-services', desc: 'Complete e-commerce growth ecosystem' },
      { label: 'US POD Fulfillment (<24H)', href: '/speedx', desc: '23-inch print tech from $6 all-in' },
      { label: 'Multi-Channel Sync', href: '/smartcommerce', desc: 'Real-time Amazon, Etsy & TikTok Shop sync' },
      { label: 'Performance Digital Ads', href: '/services/all-services', desc: 'ROAS 4.8x conversion campaigns' },
    ],
  },
  {
    label: 'Products',
    href: '/smartcommerce',
    children: [
      { label: 'Eweb-platform', href: '/smartcommerce', desc: 'Unified store, WMS & billing dashboard' },
      { label: 'Eweb-character', href: '/speedx', desc: 'AI order normalization & 24h POD routing' },
      { label: 'Eweb-builder', href: '/smartcommerce', desc: 'High-converting international storefronts' },
    ],
  },
  { label: 'Case Studies', href: '/our-work' },
  { label: 'Partners', href: '/partners' },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'All Insights', href: '/insights', desc: 'Latest articles & playbooks' },
      { label: 'Global Market Expansion', href: '/articles/global-market-expansion-cross-border-ecommerce', desc: 'US & EU scaling strategies' },
      { label: 'TikTok Shop US Compliance', href: '/articles/tiktok-shop-us-compliance-sub-24h-pod-fulfillment', desc: 'SLA < 24h & account safety' },
      { label: 'WMS Barcode & Sync', href: '/articles/wms-barcode-real-time-multi-channel-sync', desc: '99.9% inventory precision' },
    ],
  },
  {
    label: 'Company',
    href: '/company',
    children: [
      { label: 'About Us', href: '/company', desc: 'Our mission, scale & Buon Ma Thuot HQ' },
      { label: 'Careers', href: '/career', desc: 'Join our engineering & ops team' },
      { label: 'Testimonials', href: '/testimonial', desc: 'Voices of global sellers' },
      { label: 'Contact Us', href: '/contact-us', desc: 'Get free consultation' },
    ],
  },
];
```

- **Nút CTA Header**: `Get Free Consultation` -> link tới `/contact-us`.

---

## 3. Cập Nhật Footer (`components/Footer.tsx`)

### 3.1. Thông Tin Nhận Diện & Trụ Sở
- **Logo Footer**: `https://egeadcompany.com/images/egead/logo-wordmark.png`
- **Slogan**: *"Automate your operations and scale global sales with our all-in-one logistics and e-commerce fulfillment platform."*
- **Reach us at**:
  - Email: `support@egead.com` / `contact@egeadcompany.com`
  - Địa chỉ: `217/9 Ngô Quyền, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam`
- **Mạng xã hội**:
  - LinkedIn: `https://www.linkedin.com/`
  - X (Twitter): `https://x.com/`
  - Facebook: `https://www.facebook.com/`
  - YouTube: `https://www.youtube.com/`
- **Bản quyền Copyright**:
  - Cũ: `Copyright (C) 2023 SAI Digital`
  - Mới: `© 2026 E-Gead Company. All rights reserved.`

### 3.2. Cập Nhật Múi Giờ Giao Thương E-Commerce Toàn Cầu
Thay vì các múi giờ chi nhánh cũ, hiển thị đồng hồ các trung tâm giao thương chính mà seller của E-GEAD đang hoạt động:
```tsx
const locations: TimezoneLocation[] = [
  { name: 'US (Pacific)', tz: 'America/Los_Angeles' },
  { name: 'US (Eastern)', tz: 'America/New_York' },
  { name: 'London (UK)', tz: 'Europe/London' },
  { name: 'Frankfurt (DE)', tz: 'Europe/Berlin' },
  { name: 'Vietnam (HQ)', tz: 'Asia/Ho_Chi_Minh' },
  { name: 'Sydney (AU)', tz: 'Australia/Sydney' },
];
```

---

## 4. Cập Nhật Cấu Trúc Dữ Liệu `data/homepage.json`

Dưới đây là payload JSON hoàn chỉnh chuẩn hóa cho E-GEAD Company:

```json
{
  "header": {
    "logo": "https://egeadcompany.com/images/egead/logo.png",
    "btnLabel": "Get Free Consultation",
    "btnLink": "/contact-us"
  },
  "hero": {
    "firstText": "Automate <span class='animate-text'>Operations.</span> <br/>Scale <span class='animate-text'>Global Sales.</span>",
    "secondText": "Unify order management across every channel, automate multi-marketplace workflows, and synchronize inventory in real time — cutting costs while accelerating revenue growth.",
    "video": "/assets/bg_video.mp4"
  },
  "services": {
    "title": "End-to-End <span>E-Commerce Growth</span> Ecosystem.",
    "subTitle": "Capabilities",
    "items": [
      {
        "image": "https://egeadcompany.com/images/egead/why/us-pod.png",
        "itemTitle": "US POD Fulfillment",
        "itemSubTitle": "Sản xuất dưới 24 giờ",
        "itemDesc": "Công nghệ in khổ lớn 23-inch, chuẩn hóa SLA TikTok Shop US, giá trọn gói từ $6 all-in.",
        "itemBtnLink": "/speedx"
      },
      {
        "image": "https://egeadcompany.com/images/egead/why/sync.png",
        "itemTitle": "Sales Automation",
        "itemSubTitle": "Đồng bộ đa kênh thời gian thực",
        "itemDesc": "Tự động gom đơn và đồng bộ tồn kho tức thì trên Amazon, Etsy, TikTok Shop, Shopify.",
        "itemBtnLink": "/smartcommerce"
      },
      {
        "image": "https://egeadcompany.com/images/egead/why/ads.png",
        "itemTitle": "Digital Growth Marketing",
        "itemSubTitle": "Quảng cáo chuyển đổi ROAS 4.8x",
        "itemDesc": "Tối ưu hóa chiến dịch Meta, Google, TikTok Ads và mở rộng thị trường Âu - Mỹ.",
        "itemBtnLink": "/services/all-services"
      },
      {
        "image": "https://egeadcompany.com/images/egead/why/api.png",
        "itemTitle": "Developers Hub & WMS",
        "itemSubTitle": "Hạ tầng API & Kho vận số",
        "itemDesc": "Open RESTful API, Real-Time Webhooks và quản lý kho quét mã vạch chính xác 99.9%.",
        "itemBtnLink": "/services/all-services"
      }
    ],
    "btnLabel": "Explore All Capabilities",
    "btnUrl": "/services/all-services",
    "background": "/assets/bg_services.jpg"
  },
  "caseStudies": {
    "title": "<span>Proven results</span> for global sellers.",
    "subTitle": "Case Studies",
    "description": "Khi công nghệ tự động hóa, chuỗi cung ứng POD và chiến lược marketing kết hợp hoàn hảo, sự tăng trưởng doanh thu bền vững là điều tất yếu.",
    "btnLabel": "All Case Studies",
    "btnUrl": "/our-work"
  },
  "smartcx": {
    "title": "<span>Intelligent automation</span> for global sellers.",
    "subTitle": "Eweb Suite",
    "description": "Bộ ba giải pháp độc quyền Eweb-character, Eweb-platform và Eweb-builder giúp doanh nghiệp chuẩn hóa 100% dữ liệu đơn hàng, vận hành WMS chính xác 99.9% và mở rộng thị trường quốc tế không giới hạn.",
    "btnLabel": "Discover Eweb Suite",
    "btnUrl": "/smartcommerce",
    "image": "/images/egead/platform/laptop.png",
    "sectionImage": "/images/egead/why/sync.png"
  },
  "partners": {
    "subTitle": "Platform Integrations",
    "logoList": [
      { "name": "Amazon", "mediaUrl": "https://egeadcompany.com/images/egead/partners/amazon.svg" },
      { "name": "TikTok Shop", "mediaUrl": "https://egeadcompany.com/images/egead/partners/tiktok.svg" },
      { "name": "Etsy", "mediaUrl": "https://egeadcompany.com/images/egead/partners/etsy.svg" },
      { "name": "Shopify", "mediaUrl": "https://egeadcompany.com/images/egead/partners/shopify.svg" },
      { "name": "eBay", "mediaUrl": "https://egeadcompany.com/images/egead/partners/ebay.svg" },
      { "name": "WooCommerce", "mediaUrl": "https://egeadcompany.com/images/egead/partners/woocommerce.svg" },
      { "name": "Google", "mediaUrl": "https://egeadcompany.com/images/egead/partners/google.svg" },
      { "name": "Meta", "mediaUrl": "https://egeadcompany.com/images/egead/partners/meta.svg" }
    ],
    "isCenter": true
  },
  "culture": {
    "title": "We are more than an operations partner; we drive comprehensive growth through an automation technology ecosystem, US-standard POD production, and global market scaling.",
    "subTitle": "Our Scale & Impact",
    "mainBlockTitle": "Projects Delivered",
    "mainBlockValue": "100+",
    "subBlockTitle": "Global Partners",
    "subBlockValue": "20+",
    "mainBtnLabel": "About E-GEAD",
    "mainBtnUrl": "/company",
    "subBtnLabel": "Careers",
    "subBtnUrl": "/career",
    "image": "https://egeadcompany.com/images/egead/strengths/projects.png"
  },
  "contact": {
    "title": "<p>Let's <strong>automate</strong> your<br />e-commerce operations.</p>",
    "btn_label": "Get Free Consultation",
    "btn_url": "/contact-us"
  },
  "footer": {
    "footerLogo": "https://egeadcompany.com/images/egead/logo-wordmark.png",
    "copyRight": "© 2026 E-Gead Company. All rights reserved.",
    "address": "217/9 Ngo Quyen Street, Tan An Ward, Buon Ma Thuot City, Dak Lak Province, Vietnam",
    "email": "support@egead.com"
  }
}
```

---

## 5. Kết Luận
Việc cập nhật các thành phần toàn cục và tệp dữ liệu JSON này đảm bảo:
1. **Toàn bộ trang web không còn một chi tiết nào mang dấu vết SAI Digital / Concentrix**.
2. **Các component hoạt động mượt mà, đồng nhất từ header tới footer**.
3. **Mọi đường link điều hướng, form và hotline/email đều trỏ về kênh chính thức của E-GEAD Company**.
