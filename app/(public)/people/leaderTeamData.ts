import { TeamMember, allExperts, leadershipTeam } from './peopleData';

export interface SubChildNode {
  id: string;
  name: string;
  role: string;
  department: TeamMember['department'];
  location: string;
  image: string;
  quote?: string;
  skills: string[];
  responsibility: string;
  linkedin?: string;
  children?: SubChildNode[];
}

export interface ChildNode {
  id: string;
  name: string;
  role: string;
  department: TeamMember['department'];
  location: string;
  image: string;
  quote?: string;
  skills: string[];
  responsibility: string;
  linkedin?: string;
  squadName: string;
  squadFocus: string;
  levelTag: string; // e.g., "Trưởng nhóm phụ trách / Squad Lead"
  children: SubChildNode[]; // Node con con (Hiển thị dạng GRID)
}

export interface LeaderTeamHierarchy {
  leaderId: string;
  departmentScope: string;
  overview: string;
  childNodes: ChildNode[]; // Danh sách các Node con cấp 2
}

function findMember(id: string): TeamMember | undefined {
  return (
    leadershipTeam.find((l) => l.id === id) || allExperts.find((e) => e.id === id)
  );
}

function createSubChild(id: string, responsibility: string): SubChildNode | null {
  const m = findMember(id);
  if (!m) return null;
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    department: m.department,
    location: m.location,
    image: m.image,
    quote: m.quote,
    skills: m.skills,
    responsibility,
    linkedin: m.linkedin,
  };
}

function createChildNode(
  id: string,
  squadName: string,
  squadFocus: string,
  levelTag: string,
  responsibility: string,
  children: (SubChildNode | null)[]
): ChildNode | null {
  const m = findMember(id);
  if (!m) return null;
  return {
    id: m.id,
    name: m.name,
    role: m.role,
    department: m.department,
    location: m.location,
    image: m.image,
    quote: m.quote,
    skills: m.skills,
    responsibility,
    linkedin: m.linkedin,
    squadName,
    squadFocus,
    levelTag,
    children: children.filter(Boolean) as SubChildNode[],
  };
}

export const leaderHierarchies: Record<string, LeaderTeamHierarchy> = {
  // Leader 1: Suhas Hiwale - CEO (Node lớn)
  'lead-1': {
    leaderId: 'lead-1',
    departmentScope: 'Global Executive Governance & Cross-Border Commerce Architecture',
    overview:
      'Chỉ đạo toàn diện Hội đồng Điều hành Toàn cầu (Executive Leadership Team), phụ trách các thị trường trọng điểm Singapore, Nhật Bản, Mỹ, Ấn Độ và Việt Nam.',
    childNodes: [
      createChildNode(
        'lead-2',
        'Japan Regional Commercial Branch',
        'Thị trường Nhật Bản & Đối tác sản xuất',
        'Node con: Country Manager Japan',
        'Chỉ đạo phát triển thương mại tại thị trường Nhật Bản & kết nối các tập đoàn sản xuất hàng đầu.',
        [
          createSubChild('exp-2', 'Chuyên viên tư vấn thương mại & hợp đồng enterprise tại Nhật Bản.'),
          createSubChild('exp-3', 'Quản lý quan hệ khách hàng, tối ưu hóa doanh thu GMV & cam kết SLA.'),
          createSubChild('exp-7', 'Kiến trúc sư tư vấn giải pháp kỹ thuật bán lẻ đa kênh tại Tokyo.'),
          createSubChild('exp-5', 'Giám đốc bàn giao giải pháp & kiểm soát chất lượng dự án tại Nhật.'),
        ]
      )!,
      createChildNode(
        'lead-4',
        'Presales & Technical Architecture Branch',
        'Kiến trúc giải pháp số & Thẩm định kỹ thuật',
        'Node con: Senior Director of Architecture',
        'Quản trị chất lượng kỹ thuật, kiến trúc tích hợp hệ thống cho hơn 100 dự án toàn cầu.',
        [
          createSubChild('exp-1', 'Lãnh đạo hạ tầng đám mây không thời gian chết & kiến trúc microservices.'),
          createSubChild('exp-4', 'Chuyên gia xây dựng mô hình dữ liệu danh mục sản phẩm & luồng thanh toán.'),
          createSubChild('exp-11', 'Thiết kế quy tắc đồng bộ đa sàn & đối soát lợi nhuận ròng tự động.'),
          createSubChild('exp-18', 'Kỹ sư phân tích landed cost theo thời gian thực & dự báo tỷ suất biên.'),
        ]
      )!,
      createChildNode(
        'lead-7',
        'Product Engineering & AI Branch',
        'Sản phẩm công nghệ lõi & WMS tự động hóa',
        'Node con: Senior Director of Products',
        'Định hướng lộ trình sản phẩm tự động hóa, công nghệ AI xử lý địa chỉ và đồng bộ kho vận.',
        [
          createSubChild('exp-6', 'Trưởng nhóm kỹ thuật đồng bộ tồn kho đa kênh & hàng đợi thời gian thực.'),
          createSubChild('exp-15', 'Kỹ sư AI xây dựng thuật toán phân tích địa chỉ đạt độ chính xác 99.9%.'),
          createSubChild('exp-13', 'Chỉ đạo mạng lưới xưởng in khổ lớn tại Mỹ & hoàn tất đơn POD dưới 24h.'),
          createSubChild('exp-16', 'Bảo đảm tuân thủ chính sách sàn TikTok Shop US & phòng chống rủi ro.'),
        ]
      )!,
      createChildNode(
        'lead-5',
        'Global Agile Delivery & Operations Branch',
        'Bàn giao dự án đa quốc gia & văn hóa kỹ thuật',
        'Node con: Associate Delivery Director',
        'Giám sát chu kỳ triển khai Agile đa quốc gia, bảo đảm cam kết SLA khắt khe nhất.',
        [
          createSubChild('exp-8', 'Trưởng nhóm Scrum theo dõi tiến độ sprint với tỷ lệ sai lệch 0%.'),
          createSubChild('exp-9', 'Điều phối đội ngũ kỹ sư toàn cầu & kiểm thử tích hợp đa tầng.'),
          createSubChild('exp-10', 'Quản lý di chuyển nền tảng lớn & chế độ bảo hành chuyên sâu 24/7.'),
          createSubChild('exp-14', 'Chỉ đạo chiến dịch quảng cáo ROAS 4.8x & tối ưu hóa phễu tăng trưởng.'),
        ]
      )!,
    ],
  },

  // Leader 2: Osamu Kamiya - Country Manager Japan (Node lớn)
  'lead-2': {
    leaderId: 'lead-2',
    departmentScope: 'Japan Regional Commerce & Enterprise Account Advisory',
    overview:
      'Lãnh đạo đội ngũ phát triển kinh doanh, giải pháp tiền khả thi và quản trị khách hàng doanh nghiệp tại Tokyo, kết nối các nhà sản xuất Nhật Bản với thị trường toàn cầu.',
    childNodes: [
      createChildNode(
        'exp-2',
        'Commercial Solutions & Merchant Advisory',
        'Tư vấn hợp đồng enterprise & tiếp cận nhà bán lẻ',
        'Node con: Commercial Lead',
        'Chuyên gia tư vấn tiếp cận khách hàng doanh nghiệp Nhật, kết nối chuỗi cung ứng POD & marketplace.',
        [
          createSubChild('exp-3', 'Quản lý tài khoản doanh nghiệp & tối đa hóa chỉ số GMV cho người bán Nhật.'),
          createSubChild('exp-12', 'Tư vấn tích hợp quy trình thương mại xuyên biên giới chuẩn APAC.'),
        ]
      )!,
      createChildNode(
        'exp-7',
        'Architecture Blueprinting & Pre-Sales',
        'Thiết kế kiến trúc hệ thống & đánh giá hạ tầng',
        'Node con: Solutions Architect Lead',
        'Kiến trúc sư tư vấn tiền khả thi, thẩm định hạ tầng công nghệ bán lẻ đa kênh chuẩn thị trường Nhật Bản.',
        [
          createSubChild('exp-5', 'Điều phối tốc độ sprint kỹ thuật & kiểm soát chất lượng phần mềm tại Nhật.'),
          createSubChild('exp-4', 'Chuyên gia xây dựng mô hình danh mục sản phẩm & checkout đa ngôn ngữ.'),
        ]
      )!,
    ],
  },

  // Leader 3: Kenneth Kong - Head of Global Partnerships (Node lớn)
  'lead-3': {
    leaderId: 'lead-3',
    departmentScope: 'Global Strategic Alliances, Marketplace Ecosystems & Channel Scaling',
    overview:
      'Thiết lập và mở rộng mạng lưới liên minh chiến lược với các nền tảng thương mại hàng đầu thế giới (TikTok Shop US, Amazon FBM, Shopify Plus, SAP).',
    childNodes: [
      createChildNode(
        'exp-16',
        'Marketplace Compliance & Governance',
        'Tuân thủ chính sách sàn quốc tế & vận hành kho',
        'Node con: Compliance Director',
        'Bảo đảm tuân thủ nghiêm ngặt chính sách sàn TikTok Shop US, Amazon FBM & bảo vệ uy tín người bán.',
        [
          createSubChild('exp-13', 'Điều hành mạng lưới xưởng in và xuất xưởng đơn hàng POD theo chuẩn SLA sàn.'),
          createSubChild('exp-14', 'Thiết kế chiến dịch truyền thông hiệu suất cao kết hợp chính sách sàn.'),
        ]
      )!,
      createChildNode(
        'exp-12',
        'Strategic Ecosystem Architecture',
        'Liên kết các nền tảng đối tác & mở rộng thị trường',
        'Node con: Ecosystem Architect',
        'Tư vấn kiến trúc hệ thống thương mại mô-đun kết nối các kênh phân phối khu vực APAC & châu Đại Dương.',
        [
          createSubChild('exp-2', 'Kết nối đối tác thương hiệu tham gia hệ sinh thái bán hàng đa kênh.'),
          createSubChild('exp-11', 'Quy hoạch luồng trao đổi dữ liệu đơn hàng giữa đối tác và hệ thống lõi.'),
        ]
      )!,
    ],
  },

  // Leader 4: Manjula Mariswamy - Senior Director - Presales & Project Excellence (Node lớn)
  'lead-4': {
    leaderId: 'lead-4',
    departmentScope: 'Presales Solution Architecture, Governance & Technical Excellence',
    overview:
      'Chỉ đạo quy trình tư vấn kỹ thuật tiền khả thi, kiến trúc hệ thống tích hợp phức tạp và kiểm soát tiêu chuẩn chất lượng chuyển đổi cho các dự án thương mại.',
    childNodes: [
      createChildNode(
        'exp-1',
        'Cloud Infrastructure & Technical Governance',
        'Hạ tầng vi dịch vụ & Điện toán đám mây phân tán',
        'Node con: Technology Director',
        'Định hướng tiêu chuẩn kiến trúc đám mây phân tán, đảm bảo hệ thống vận hành 99.99% uptime.',
        [
          createSubChild('exp-6', 'Trưởng nhóm triển khai kiến trúc Fullstack & hạ tầng worker thời gian thực.'),
          createSubChild('exp-15', 'Kỹ sư trưởng phát triển hệ thống pipeline AI & tích hợp webhooks lõi.'),
        ]
      )!,
      createChildNode(
        'exp-4',
        'Commerce Solutions & Business Logic',
        'Quy tắc nghiệp vụ thương mại & Đối soát tự động',
        'Node con: Solutions Practice Lead',
        'Chuyên gia xây dựng mô hình danh mục sản phẩm, luồng thanh toán động và tích hợp ERP chuyên sâu.',
        [
          createSubChild('exp-7', 'Kiến trúc sư đánh giá và lập giải pháp kỹ thuật tiền khả thi.'),
          createSubChild('exp-11', 'Thiết kế quy tắc đối soát tài chính và đồng bộ đơn hàng đa kênh.'),
          createSubChild('exp-18', 'Mô hình hóa chi phí vận chuyển và phân tích chỉ số landed cost thực tế.'),
        ]
      )!,
    ],
  },

  // Leader 5: Meetu Sharma - Associate Delivery Director (Node lớn)
  'lead-5': {
    leaderId: 'lead-5',
    departmentScope: 'Global Agile Delivery, Cross-Border Sprint Execution & SLA Governance',
    overview:
      'Điều hành các đội ngũ kỹ sư Agile phân tán đa quốc gia, cam kết tiến độ bàn giao chính xác từng sprint và tuân thủ các chỉ số SLA khắt khe nhất.',
    childNodes: [
      createChildNode(
        'exp-5',
        'Regional Implementation & Risk Management',
        'Quản trị triển khai dự án khu vực & phòng ngừa rủi ro',
        'Node con: Senior Delivery Manager',
        'Quản lý cấp cao phụ trách chất lượng triển khai, kiểm soát rủi ro cho các nhóm phát triển đa ngôn ngữ.',
        [
          createSubChild('exp-3', 'Giám sát chỉ số SLA khách hàng và giải quyết vướng mắc kịp thời.'),
          createSubChild('exp-12', 'Hỗ trợ đặc tả kỹ thuật và liên lạc kỹ thuật xuyên biên giới.'),
        ]
      )!,
      createChildNode(
        'exp-8',
        'Agile Sprint Release & Hypercare',
        'Tiến độ Scrum, phát hành phần mềm & giám sát 24/7',
        'Node con: Senior Project Manager',
        'Trưởng nhóm Scrum theo dõi tiến độ từng mốc bàn giao, bảo đảm cam kết hoàn thành sprint chuẩn xác.',
        [
          createSubChild('exp-9', 'Điều phối đường ống release tự động và kiểm thử chấp nhận người dùng.'),
          createSubChild('exp-10', 'Dẫn dắt các đợt chuyển đổi hệ thống lớn và giám sát trực ban 24/7.'),
          createSubChild('exp-6', 'Hỗ trợ kỹ thuật sprint nâng cao và xử lý lỗi hiệu năng tức thì.'),
        ]
      )!,
    ],
  },

  // Leader 6: Kevin Frot - Executive CX Director (Node lớn)
  'lead-6': {
    leaderId: 'lead-6',
    departmentScope: 'Customer Experience Strategy, Storefront UI/UX & High-Converting Journeys',
    overview:
      'Chỉ đạo chiến lược trải nghiệm số đỉnh cao, thiết kế hành trình mua sắm chuyển đổi tối ưu và giao diện storefront thời thượng cho người tiêu dùng Âu - Mỹ.',
    childNodes: [
      createChildNode(
        'exp-17',
        'Headless Storefront & UX Architecture',
        'Giao diện tốc độ cao, vi tương tác & Core Web Vitals',
        'Node con: UI/UX Architect Lead',
        'Kiến trúc sư giao diện headless siêu tốc độ với Next.js và Tailwind, tối ưu hóa trải nghiệm mua sắm.',
        [
          createSubChild('exp-6', 'Kỹ sư Fullstack hỗ trợ tối ưu hiệu năng render phía client & server.'),
          createSubChild('exp-11', 'Tối ưu hóa các bước thanh toán và giảm thiểu tỷ lệ bỏ rơi giỏ hàng.'),
        ]
      )!,
      createChildNode(
        'exp-14',
        'Conversion Rate & Performance Media',
        'Chiến dịch truyền thông chuyển đổi & phễu tăng trưởng',
        'Node con: Growth & Media Lead',
        'Thiết kế phễu quảng cáo trực quan, kiểm thử A/B trang đích và tối ưu hóa chi phí thu hút khách hàng.',
        [
          createSubChild('exp-16', 'Đảm bảo nội dung quảng cáo tuân thủ tiêu chuẩn cộng đồng nền tảng.'),
          createSubChild('exp-2', 'Phối hợp phát triển thông điệp thương hiệu cho thị trường mục tiêu.'),
        ]
      )!,
    ],
  },

  // Leader 7: Sudip Saha - Senior Director of Products (Node lớn)
  'lead-7': {
    leaderId: 'lead-7',
    departmentScope: 'Proprietary Automation Modules, AI Address Cleaners & WMS Infrastructure',
    overview:
      'Lãnh đạo bộ phận sản phẩm công nghệ độc quyền, phát triển module AI xử lý địa chỉ quốc tế, công cụ định tuyến đơn tự động và hạ tầng hoàn tất đơn hàng.',
    childNodes: [
      createChildNode(
        'exp-6',
        'Automation Engine & Distributed Services',
        'Bộ máy đồng bộ đa sàn, hàng đợi tin nhắn & API lõi',
        'Node con: Practice Lead',
        'Chuyên gia phát triển công cụ đồng bộ tồn kho đa kênh thời gian thực và hệ thống xử lý hàng loạt.',
        [
          createSubChild('exp-15', 'Kỹ sư AI xây dựng thuật toán chuẩn hóa địa chỉ tự động chính xác cao.'),
          createSubChild('exp-1', 'Cố vấn hạ tầng vi dịch vụ đám mây và mở rộng quy mô không gián đoạn.'),
        ]
      )!,
      createChildNode(
        'exp-13',
        'Smart Warehouse & Rapid Fulfillment',
        'Kho vận thông minh, in POD 24h & kiểm chuẩn mã vạch',
        'Node con: Operations Lead',
        'Chỉ đạo mạng lưới xưởng in khổ lớn tại Mỹ, quy trình quét mã vạch và cam kết hoàn tất đơn POD dưới 24h.',
        [
          createSubChild('exp-16', 'Bảo đảm quy trình xử lý đơn hàng tuân thủ chính sách vận chuyển của sàn.'),
          createSubChild('exp-18', 'Theo dõi dữ liệu tồn kho, phân tích chi phí giao vận và cảnh báo lệch hàng.'),
        ]
      )!,
    ],
  },

  // Leader 8: Thao Tran - Head of Human Resources (Node lớn)
  'lead-8': {
    leaderId: 'lead-8',
    departmentScope: 'Global Talent Acquisition, Culture Building & Engineering Mentorship',
    overview:
      'Chỉ huy chiến lược phát triển tài năng, xây dựng môi trường làm việc sáng tạo, khuyến khích tinh thần làm chủ và đào tạo thế hệ kỹ sư hàng đầu.',
    childNodes: [
      createChildNode(
        'exp-8',
        'Agile Culture & Team Engagement',
        'Văn hóa làm việc Agile, tinh thần đồng đội & động lực phát triển',
        'Node con: Culture & Scrum Lead',
        'Đồng hành tổ chức các workshop chia sẻ kỹ năng Agile và duy trì tinh thần làm việc hứng khởi.',
        [
          createSubChild('exp-9', 'Điều phối các hoạt động gắn kết đội ngũ kỹ sư tại các văn phòng quốc tế.'),
          createSubChild('exp-3', 'Cầu nối lắng nghe phản hồi của nhân sự tại thị trường khu vực Nhật Bản.'),
        ]
      )!,
      createChildNode(
        'exp-6',
        'Technical Mentorship & Capability Building',
        'Cố vấn năng lực kỹ sư, đào tạo chuyên sâu & quy chuẩn mã nguồn',
        'Node con: Mentorship Lead',
        'Phụ trách chương trình cố vấn kỹ thuật, đào tạo kỹ năng thực chiến cho các thế hệ kỹ sư mới.',
        [
          createSubChild('exp-13', 'Điều phối chương trình đào tạo kỹ năng an toàn và vận hành xưởng in POD.'),
          createSubChild('exp-15', 'Tổ chức các buổi chia sẻ kiến thức chuyên đề về AI và tự động hóa hệ thống.'),
        ]
      )!,
    ],
  },
};
