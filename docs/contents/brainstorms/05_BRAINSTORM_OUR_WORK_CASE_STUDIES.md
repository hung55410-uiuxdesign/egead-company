# BRAINSTORM CHI TIẾT: DỰ ÁN & NGHIÊN CỨU ĐIỂN HÌNH (OUR WORK / CASE STUDIES)
> **Trang đích**: `app/our-work/page.tsx`  
> **Tham chiếu chuẩn**: Mục Case Studies và các số liệu hiệu quả chiến dịch trên [https://egeadcompany.com/](https://egeadcompany.com/)  
> **Nguyên tắc kỹ thuật**: Giữ nguyên cơ chế tương tác Filter Tabs (`filter === 'all'`), mảng `projects` chứa các thuộc tính (`id`, `client`, `category`, `industry`, `title`, `desc`, `image`, `metrics`, `slug`), bố cục card 2 cột sang trọng với badge metrics và nút liên kết.

---

## 1. Phân tích Hiện trạng & Định hướng Tái Cấu Trúc

### 1.1. Hiện trạng Codebase cũ
- 4 case study B2B doanh nghiệp cũ:
  1. *Suntory PepsiCo* (Giải pháp cổng thông tin B2B nước giải khát)
  2. *Brother International* (Tập hợp nền tảng máy in điện tử toàn cầu)
  3. *Weir Group* (Số hóa thiết bị khai khoáng công nghiệp)
  4. *Manulife Insurance* (Chuyển đổi số bảo hiểm cho giới trẻ)
- Bộ lọc: `consumer-goods`, `electronics`, `manufacturing`, `finance`.

### 1.2. Định hướng Chuyển đổi sang E-GEAD Company
E-GEAD là đối tác vận hành và công nghệ cho **người bán hàng quốc tế (Cross-border Sellers), các thương hiệu bán lẻ (DTC Brands) và mạng lưới in ấn POD**. Do đó, các Case Studies cần thể hiện những câu chuyện thành công thực chiến:
1. **TikTok Shop US**: Giải quyết bài toán khắc nghiệt về thời gian giao hàng (SLA < 24h) và bảo vệ an toàn tài khoản.
2. **Đa Sàn (Amazon, Etsy, Shopify)**: Giải quyết bài toán quá tải đơn hàng và lỗi overselling qua Eweb-platform.
3. **Chạy Ads Chuyển Đổi**: Bứt phá ROAS lên 4.8x, CPA thấp $8.4 tại thị trường Mỹ & Châu Âu.
4. **Tích hợp API Hệ thống Lớn**: Xử lý hơn 10,000 đơn hàng POD mỗi ngày qua Open RESTful API và WMS.

---

## 2. Chi tiết Cập nhật Giao diện & Dữ liệu trong `app/our-work/page.tsx`

### 2.1. Metadata & SEO Headers
```tsx
export const metadata = {
  title: 'Case Studies & Client Success | E-GEAD Company',
  description: 'Explore how global e-commerce sellers and DTC brands scale revenue, eliminate late dispatch SLA, and achieve 4.8x ROAS with E-GEAD.',
};
```

---

### 2.2. Hero Header

```tsx
<section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-16 sm:mb-20">
  <div className="max-w-4xl">
    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#5EFC8D] block mb-4">
      Proven Results
    </span>
    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6">
      <span className="text-[#5EFC8D]">Measurable Growth</span> <br />
      for Global E-Commerce Sellers.
    </h1>
    <p className="text-lg sm:text-xl text-gray-300 font-normal leading-relaxed max-w-3xl">
      Khám phá cách E-GEAD đồng hành cùng các nhà bán lẻ quốc tế giải quyết triệt để bài toán vận hành, duy trì chỉ số SLA hoàn hảo trên TikTok Shop & Amazon, và bứt phá doanh số thông qua công nghệ tự động hóa.
    </p>
  </div>
</section>
```

---

### 2.3. Cập nhật Danh mục Bộ Lọc (Filter Categories)

Chuyển đổi bộ lọc ngành thành các nhóm giải pháp thương mại điện tử:
```tsx
const filterCategories = [
  { id: 'all', label: 'All Case Studies' },
  { id: 'pod-fulfillment', label: 'POD Fulfillment' },
  { id: 'marketplace-sync', label: 'Multi-Channel Sync' },
  { id: 'performance-ads', label: 'Digital Ads & Growth' },
  { id: 'api-integration', label: 'API & WMS Integration' },
];
```

---

### 2.4. Mảng Dữ liệu Dự án Mới (`projects`)

```tsx
const projects = [
  {
    id: 'urbanvibe',
    client: 'UrbanVibe Apparel (US)',
    category: 'Print-on-Demand Fashion',
    industry: 'pod-fulfillment',
    title: 'Hoàn tất 100% đơn hàng dưới 24h & Giữ vững chứng chỉ TikTok Shop Fast Dispatch',
    desc: 'UrbanVibe đối mặt với nguy cơ bị phạt trễ hạn và khóa gian hàng TikTok Shop US do xưởng in cũ mất 3-5 ngày xử lý. Sau khi chuyển đổi sang E-GEAD, 100% đơn hàng được in ấn khổ lớn 23-inch và bàn giao đơn vị vận chuyển trong vòng 24H với mức giá trọn gói $6, giúp thương hiệu tự tin scale chiến dịch Mega Sale.',
    image: '/assets/case_suntory.jpg',
    metrics: ['SLA < 24 Hours', '0% Late Dispatch', '+180% Q4 Revenue'],
    slug: 'urbanvibe-tiktok-shop-us-pod-fulfillment-sla',
  },
  {
    id: 'homecraft',
    client: 'HomeCraft Studio (US & UK)',
    category: 'Home Living & Custom Gifts',
    industry: 'marketplace-sync',
    title: 'Tự động hóa luồng đơn hàng và đồng bộ tồn kho thời gian thực trên 3 sàn lớn',
    desc: 'Với hơn 1,500 mã SKU bán đồng thời trên Amazon, Etsy và Shopify, HomeCraft thường xuyên gặp tình trạng hết hàng ảo và mất 15 giờ mỗi tuần đối soát file Excel thủ công. Nền tảng Eweb-platform đã kết nối tập trung, tự động gom đơn và điều phối kho WMS với độ chính xác quét mã vạch 99.9%.',
    image: '/assets/case_brother.jpg',
    metrics: ['99.9% WMS Accuracy', '-85% Manual Ops', 'Zero Stockouts'],
    slug: 'homecraft-multi-channel-sync-amazon-etsy-shopify',
  },
  {
    id: 'lumina',
    client: 'Lumina DTC Brand',
    category: 'Performance Marketing',
    industry: 'performance-ads',
    title: 'Bứt phá ROAS lên 4.8x và hạ chi phí thu hút khách hàng (CPA) xuống $8.4',
    desc: 'Đội ngũ Digital Growth Marketing của E-GEAD đã xây dựng lại toàn bộ phễu quảng cáo chuyển đổi trên Meta và TikTok Ads cho Lumina. Ứng dụng AI phân tích xu hướng tiêu dùng bản địa tại thị trường Mỹ và Châu Âu, chiến dịch đã mang về hơn 92,000 lượt truy cập chất lượng cao và tăng trưởng 34% doanh thu hàng tháng.',
    image: '/assets/case_weir.jpg',
    metrics: ['ROAS 4.8x', 'CPA $8.4', '+92K Monthly Traffic'],
    slug: 'lumina-performance-digital-ads-scale-us-eu',
  },
  {
    id: 'printwave',
    client: 'PrintWave Enterprise Network',
    category: 'Enterprise API Architecture',
    industry: 'api-integration',
    title: 'Xử lý 10,000+ đơn hàng POD mỗi ngày qua Open RESTful API và Real-Time Webhooks',
    desc: 'PrintWave sở hữu hệ thống phần mềm quản lý đơn hàng riêng cần đẩy hàng nghìn đơn mỗi ngày đến các xưởng in tại Hoa Kỳ. Bằng cách tích hợp Open RESTful API và Webhooks sự kiện của E-GEAD, toàn bộ quy trình đẩy file in, nhận mã tracking tự động và đối soát tài chính đều diễn ra trong tích tắc với độ khả dụng 99.9%.',
    image: '/assets/case_manulife.jpg',
    metrics: ['10,000+ Orders/Day', '99.9% API Uptime', '<150ms Latency'],
    slug: 'printwave-open-restful-api-enterprise-wms-integration',
  },
];
```

---

## 3. Lợi ích & Giá trị Chuyển đổi
- **Tập trung vào nỗi đau có thật**: Người đọc là seller sẽ lập tức tìm thấy trường hợp của chính mình (sợ trễ hạn TikTok Shop, mệt mỏi vì đối soát Excel, chạy ads lỗ, cần kết nối API).
- **Số liệu chứng minh uy tín**: Các chỉ số `SLA < 24 Hours`, `0% Late Dispatch`, `ROAS 4.8x`, `CPA $8.4` trùng khớp với các thông số truyền thông trên website chính thức [egeadcompany.com](https://egeadcompany.com/).
- **Bảo toàn 100% mã nguồn**: Logic React `useState('all')` và code JSX render danh sách không bị tác động, đảm bảo trang vận hành mượt mà, không sinh lỗi runtime.
