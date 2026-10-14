import { PostStatus } from '@/types/blog';

export interface ParsedBlogPost {
  title: string;
  slug?: string;
  subtitle?: string;
  tag?: string;
  category?: string;
  readTime?: string;
  heroImage?: string;
  excerpt?: string;
  contentHtml: string;
  authorName?: string;
  authorRole?: string;
  status?: PostStatus;
}

/**
 * Slugify a title into a clean SEO slug
 */
export function generateSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Basic markdown parser to HTML compatible with TipTap WYSIWYG
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) return '';

  const lines = markdown.trim().split('\n');
  const htmlParts: string[] = [];
  let inUl = false;
  let inOl = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inTable = false;
  let tableHeaderParsed = false;

  const closeLists = () => {
    if (inUl) {
      htmlParts.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      htmlParts.push('</ol>');
      inOl = false;
    }
  };

  const closeTable = () => {
    if (inTable) {
      htmlParts.push('</tbody></table>');
      inTable = false;
      tableHeaderParsed = false;
    }
  };

  const processInline = (text: string): string => {
    return text
      // Images ![alt](src)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      // Links [text](href)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Bold **text** or __text__
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
      // Italic *text* or _text_
      .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')
      // Strikethrough ~~text~~
      .replace(/~~(.*?)~~/g, '<s>$1</s>')
      // Inline code `code`
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        htmlParts.push(`<pre><code>${codeBlockContent.join('\n')}</code></pre>`);
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        closeLists();
        closeTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(rawLine);
      continue;
    }

    // Empty lines
    if (!trimmed) {
      closeLists();
      closeTable();
      continue;
    }

    // Markdown Table detection (starts and ends with | or contains | )
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      closeLists();
      // Separator row e.g. |---|---|
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        continue;
      }

      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => processInline(c.trim()));

      if (!inTable) {
        inTable = true;
        tableHeaderParsed = true;
        htmlParts.push('<table class="border-collapse border border-slate-200 w-full my-4"><thead><tr>');
        cells.forEach((cell) => {
          htmlParts.push(`<th class="border border-slate-200 px-3 py-2 bg-slate-50 text-left font-bold">${cell}</th>`);
        });
        htmlParts.push('</tr></thead><tbody>');
      } else {
        htmlParts.push('<tr>');
        cells.forEach((cell) => {
          htmlParts.push(`<td class="border border-slate-200 px-3 py-2">${cell}</td>`);
        });
        htmlParts.push('</tr>');
      }
      continue;
    } else {
      closeTable();
    }

    // Headings
    if (trimmed.startsWith('#### ')) {
      closeLists();
      htmlParts.push(`<h4>${processInline(trimmed.slice(5))}</h4>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      closeLists();
      htmlParts.push(`<h3>${processInline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith('## ')) {
      closeLists();
      htmlParts.push(`<h2>${processInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith('# ')) {
      closeLists();
      htmlParts.push(`<h2>${processInline(trimmed.slice(2))}</h2>`);
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('> ')) {
      closeLists();
      htmlParts.push(`<blockquote><p>${processInline(trimmed.slice(2))}</p></blockquote>`);
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      closeLists();
      htmlParts.push('<hr />');
      continue;
    }

    // Unordered List (- or *)
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (inOl) {
        htmlParts.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        htmlParts.push('<ul>');
        inUl = true;
      }
      htmlParts.push(`<li>${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered List (1. 2. etc.)
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) {
        htmlParts.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        htmlParts.push('<ol>');
        inOl = true;
      }
      htmlParts.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    // Standard paragraph
    closeLists();
    htmlParts.push(`<p>${processInline(trimmed)}</p>`);
  }

  closeLists();
  closeTable();

  return htmlParts.join('');
}

/**
 * Parse AI generated text (Markdown with Frontmatter or JSON) into structured post
 */
export function parseAIBlogContent(rawInput: string): ParsedBlogPost {
  if (!rawInput || !rawInput.trim()) {
    throw new Error('Nội dung nhập vào không được để trống.');
  }

  let cleaned = rawInput.trim();

  // Strip wrapping markdown code blocks if the user copied ```markdown ... ``` or ```yaml ... ```
  const codeBlockMatch = cleaned.match(/^```(?:markdown|md|ya?ml|json)?\s*([\s\S]*?)\s*```$/);
  if (codeBlockMatch) {
    cleaned = codeBlockMatch[1].trim();
  }

  // Case 1: Pure JSON format
  if (cleaned.startsWith('{') && cleaned.endsWith('}')) {
    try {
      const json = JSON.parse(cleaned);
      if (!json.title) {
        throw new Error('Định dạng JSON thiếu trường "title".');
      }

      const content = typeof json.content === 'string'
        ? (json.content.includes('<p>') ? json.content : markdownToHtml(json.content))
        : Array.isArray(json.content)
        ? json.content.map((p: string) => `<p>${p}</p>`).join('')
        : `<p>${json.excerpt || json.title}</p>`;

      return {
        title: String(json.title || '').trim(),
        slug: json.slug ? String(json.slug).trim() : generateSlug(String(json.title)),
        subtitle: json.subtitle ? String(json.subtitle).trim() : undefined,
        tag: json.tag ? String(json.tag).trim() : 'Market Expansion',
        category: json.category ? String(json.category).trim() : 'E-Commerce Strategy',
        readTime: json.readTime ? String(json.readTime).trim() : '5 mins read',
        heroImage: json.heroImage ? String(json.heroImage).trim() : '/assets/case_brother.jpg',
        excerpt: json.excerpt ? String(json.excerpt).trim() : '',
        contentHtml: content,
        authorName: json.authorName || json.author?.name || 'E-GEAD Research Team',
        authorRole: json.authorRole || json.author?.role || 'Global Commerce Strategist',
        status: (json.status as PostStatus) || 'draft',
      };
    } catch (e) {
      if (e instanceof Error && e.message.includes('JSON')) {
        // Fallback to frontmatter or raw parsing if json parse failed
      } else {
        throw e;
      }
    }
  }

  // Case 2: Markdown with Frontmatter --- ... ---
  const frontmatterMatch = cleaned.match(/^---\s*\n([\s\S]*?)\n---\s*(\n[\s\S]*)$/);

  if (frontmatterMatch) {
    const rawYaml = frontmatterMatch[1];
    const markdownBody = frontmatterMatch[2];

    const metadata: Record<string, string> = {};
    const yamlLines = rawYaml.split('\n');

    for (const line of yamlLines) {
      const separatorIdx = line.indexOf(':');
      if (separatorIdx !== -1) {
        const key = line.slice(0, separatorIdx).trim();
        let value = line.slice(separatorIdx + 1).trim();

        // Strip quotes if any
        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1).trim();
        }

        if (key) {
          metadata[key] = value;
        }
      }
    }

    const title = metadata.title || metadata.Title || '';
    if (!title) {
      throw new Error('Không tìm thấy trường "title" trong phần cấu hình frontmatter (---).');
    }

    const contentHtml = markdownToHtml(markdownBody);

    return {
      title,
      slug: metadata.slug || generateSlug(title),
      subtitle: metadata.subtitle,
      tag: metadata.tag || 'Market Expansion',
      category: metadata.category || 'E-Commerce Strategy',
      readTime: metadata.readTime || '5 mins read',
      heroImage: metadata.heroImage || '/assets/case_brother.jpg',
      excerpt: metadata.excerpt || '',
      contentHtml: contentHtml || `<p>${metadata.excerpt || title}</p>`,
      authorName: metadata.authorName || metadata.author || 'E-GEAD Research Team',
      authorRole: metadata.authorRole || 'Global Commerce Strategist',
      status: (metadata.status as PostStatus) || 'draft',
    };
  }

  // Case 3: Raw Markdown without frontmatter (Auto-infer)
  const lines = cleaned.split('\n').filter((l) => l.trim().length > 0);
  if (lines.length === 0) {
    throw new Error('Nội dung không hợp lệ hoặc quá ngắn.');
  }

  // Look for first heading as title or first line
  let title = '';
  let startIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith('# ')) {
      title = l.slice(2).trim();
      startIndex = i + 1;
      break;
    }
  }

  if (!title) {
    title = lines[0].replace(/^[#*\s-]+/, '').trim();
    startIndex = 1;
  }

  const remainingBody = lines.slice(startIndex).join('\n\n');
  const excerpt = lines[startIndex] ? lines[startIndex].slice(0, 200).trim() : '';

  return {
    title,
    slug: generateSlug(title),
    tag: 'Market Expansion',
    category: 'E-Commerce Strategy',
    readTime: '5 mins read',
    heroImage: '/assets/case_brother.jpg',
    excerpt,
    contentHtml: markdownToHtml(remainingBody) || `<p>${excerpt || title}</p>`,
    authorName: 'E-GEAD Research Team',
    authorRole: 'Global Commerce Strategist',
    status: 'draft',
  };
}

export interface BlogPromptTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  category: string;
  tag: string;
  prompt: (availableCategories?: string[]) => string;
  sampleMarkdown: string;
}

/**
 * Mẫu 1: Hoạt động nội bộ & Sự kiện văn hóa (Trung thu, sinh nhật, lễ hội)
 * Dựa trên bài đăng thực tế của Fanpage EGEAD Company
 */
export const SAMPLE_CULTURE_EVENT_MARKDOWN = `---
title: "Trung thu đoàn viên – Sinh nhật tháng 9 ấm áp cùng đại gia đình E-GEAD"
subtitle: "Gắn kết yêu thương, sẻ chia niềm vui và lưu giữ những khoảnh khắc đáng nhớ"
category: "Culture & People"
tag: "Company Culture"
readTime: "4 mins read"
excerpt: "Tháng 9 tại E-GEAD trở nên trọn vẹn và ý nghĩa hơn bao giờ hết với buổi tiệc Trung thu đoàn viên kết hợp chúc mừng sinh nhật các thành viên có ngày sinh trong tháng."
authorName: "E-GEAD People & Culture"
authorRole: "Internal Communications"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Mùa Trung thu ấm áp bên đại gia đình E-GEAD

Một mùa Trung Thu nữa lại về, mang theo những khoảnh khắc ấm áp và những niềm vui giản dị nhưng đong đầy tình cảm bên đại gia đình **E-GEAD**.

Trong không khí rộn ràng của tết đoàn viên, toàn thể nhân sự tại các cơ sở đã cùng quây quần bên nhau, thưởng thức những chiếc bánh Trung Thu truyền thống, những tách trà thơm và gửi trao nhau những lời chúc an lành, tươi vui nhất.

## 2. Nhân đôi niềm vui: Chúc mừng sinh nhật các thành viên tháng 9

Tháng 9 này càng thêm phần đặc biệt khi E-GEAD kết hợp tổ chức sinh nhật cho những thành viên có ngày sinh trong tháng:

- Những món quà nhỏ ý nghĩa được ban lãnh đạo và đại diện công đoàn trao tận tay.
- Những chiếc bánh kem rực rỡ nến cùng giai điệu Happy Birthday quen thuộc vang lên trong tiếng cười giòn giã.
- Những khoảnh khắc check-in, lưu lại kỷ niệm đáng nhớ của tuổi mới cùng những người đồng đội thân thiết.

> "Mỗi dịp gặp gỡ không chỉ là một buổi liên hoan, mà là một cơ hội để mọi người gần nhau hơn, cùng chia sẻ niềm vui và tạo nên những kỷ niệm đẹp trong hành trình đồng hành tại E-GEAD."

## 3. Văn hóa gắn kết – Sức mạnh cốt lõi của E-GEAD

Tại E-GEAD, con người luôn là trung tâm của mọi sự phát triển. Dù đang làm việc tại các văn phòng hay các chi nhánh, tinh thần **#EGEADTogether** luôn hiện hữu trong từng công việc hàng ngày và từng hoạt động văn hóa tập thể.

Từ những chương trình teambuilding bùng nổ năng lượng như *EGEAD Amazing Race* cho đến những bữa tiệc sinh nhật ấm cúng, đại gia đình E-GEAD luôn chứng minh tinh thần đoàn kết, sẵn sàng sát cánh và cùng nhau chinh phục những mục tiêu mới.

Chúc các thành viên sinh nhật tháng 9 luôn ngập tràn niềm vui, sức khỏe và gặt hái thật nhiều thành công! Chúc đại gia đình E-GEAD luôn đoàn kết, hạnh phúc và tạo nên nhiều dấu ấn rực rỡ trong thời gian tới.

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- LinkedIn: [linkedin.com/company/egead](https://www.linkedin.com/company/egead/)
- Email: contact@egeadcompany.com
- Cơ sở 1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- Cơ sở 2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;

export function getCultureEventsPrompt(availableCategories: string[] = []): string {
  const catList = availableCategories.length > 0
    ? availableCategories.join(', ')
    : 'Culture & People, Company News, Operations';

  return `Bạn là chuyên gia truyền thông nội bộ (Internal Communications) tại E-GEAD Company.
Hãy viết một bài viết truyền cảm hứng về hoạt động văn hóa / sự kiện nội bộ của công ty về chủ đề:
[ĐIỀN CHỦ ĐỀ SỰ KIỆN: Ví dụ "Trung thu đoàn viên & Sinh nhật tháng 9", "Ngày phụ nữ Việt Nam 20/10", "Tất niên Year End Party", "Cập nhật diện mạo nhân sự mới"...]

Yêu cầu BẮT BUỘC: Hãy trả về bài viết CHÍNH XÁC theo cấu trúc Markdown có Frontmatter dưới đây (không viết lời chào, không thêm bất kỳ văn bản nào bên ngoài khối):

---
title: "[Tiêu đề bài viết ấm áp, tươi vui, chuẩn SEO]"
subtitle: "[Phụ đề ngắn gọn nêu bật thông điệp gắn kết]"
category: "[Chọn 1 trong các chuyên mục sau: ${catList}]"
tag: "[Thẻ hiển thị: Company Culture, Team Celebration, EGEAD Together...]"
readTime: "4 mins read"
excerpt: "[Đoạn tóm tắt súc tích 2-3 câu làm nổi bật sự kiện]"
authorName: "E-GEAD People & Culture"
authorRole: "Internal Communications"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Không khí rộn ràng và ý nghĩa sự kiện
[Nội dung mô tả bối cảnh, cảm xúc ngày hội...]

## 2. Những khoảnh khắc đáng nhớ và điểm nhấn hoạt động
[Chi tiết các hoạt động như trao quà, chúc mừng, cắt bánh, chia sẻ...]
- Hoạt động nổi bật 1
- Hoạt động nổi bật 2

> "[Câu trích dẫn ngắn nêu bật thông điệp gắn kết con người E-GEAD]"

## 3. Tinh thần đồng đội #EGEADTogether
[Nêu bật văn hóa doanh nghiệp lấy con người làm trung tâm, sự gắn kết giữa các cơ sở Đắk Lắk và Hà Nội...]

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- LinkedIn: [linkedin.com/company/egead](https://www.linkedin.com/company/egead/)
- Email: contact@egeadcompany.com
- Cơ sở 1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- Cơ sở 2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;
}

/**
 * Mẫu 2: Chuyển bài đăng Facebook / Fanpage thành bài Blog hoàn chỉnh
 */
export const SAMPLE_SOCIAL_TO_BLOG_MARKDOWN = `---
title: "Lan tỏa văn hóa đoàn viên và tri ân tập thể nhân sự E-GEAD"
subtitle: "Từ những mẩu chuyện nhỏ trên mạng xã hội đến hành trình kiến tạo môi trường làm việc hạnh phúc"
category: "Company News"
tag: "Social Spotlight"
readTime: "5 mins read"
excerpt: "Chuyển hóa những bài đăng ngắn từ Fanpage chính thức thành góc nhìn sâu sắc về văn hóa sẻ chia và tri ân tại E-GEAD."
authorName: "E-GEAD Editorial Board"
authorRole: "Brand Communications"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Kết nối từ những bài đăng trên mạng xã hội

Trên trang truyền thông chính thức **EGEAD Company**, mỗi bài đăng không chỉ đơn thuần là thông báo cập nhật, mà còn là thước phim ghi lại đời sống chân thực của từng thành viên. 

Dù là bức ảnh bìa chụp tập thể rạng rỡ của toàn thể đội ngũ hay bài viết chúc mừng sinh nhật tháng, tất cả đều mang chung một tinh thần: trân trọng từng cá nhân đã và đang cống hiến cho mái nhà chung E-GEAD.

## 2. Chi tiết hoạt động và phản hồi tích cực từ cộng đồng

Các sự kiện như đón Tết Trung Thu và vinh danh sinh nhật thành viên luôn nhận được sự hưởng ứng nhiệt thành:
- Tinh thần đoàn kết thể hiện qua sự hỗ trợ lẫn nhau giữa hai đầu cầu Hà Nội và Đắk Lắk.
- Những lời chúc chân thành từ ban lãnh đạo và các đồng nghiệp.

> "Sự gắn kết không đến từ những lời nói hoa mỹ, mà bắt nguồn từ những cử chỉ quan tâm giản dị mỗi ngày."

## 3. Lời cảm ơn và định hướng tương lai

E-GEAD xin gửi lời cảm ơn sâu sắc đến quý khách hàng, đối tác và toàn thể nhân sự đã luôn dõi theo, đồng hành cùng trang Fanpage và các kênh thông tin của công ty.

---

### THÔNG TIN LIÊN HỆ
- Website: [egeadcompany.com](https://egeadcompany.com)
- Facebook: [facebook.com/EGEADCompany](https://www.facebook.com/EGEADCompany)
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;

export function getSocialToBlogPrompt(availableCategories: string[] = []): string {
  const catList = availableCategories.length > 0
    ? availableCategories.join(', ')
    : 'Company News, Culture & People, Operations';

  return `Bạn là chuyên gia Content & PR tại E-GEAD Company.
Tôi sẽ cung cấp cho bạn một bài đăng ngắn (post) từ Fanpage Facebook hoặc LinkedIn của E-GEAD:

[DÁN NỘI DUNG BÀI ĐĂNG FACEBOOK / MẠNG XÃ HỘI VÀO ĐÂY]

Nhiệm vụ của bạn:
1. Phát triển nội dung ngắn trên thành một bài viết Blog website chuyên sâu, chuẩn SEO, giọng văn trang trọng, truyền cảm hứng.
2. Giữ nguyên các thông điệp, hashtags và thông tin liên hệ cốt lõi (Cơ sở 1 Đắk Lắk, Cơ sở 2 Hà Nội, website, email).
3. Bổ sung các đề mục phân tích (Heading H2, H3), danh sách điểm nhấn và một câu trích dẫn đắt giá.
4. Trả về bài viết CHÍNH XÁC theo cấu trúc Markdown có Frontmatter sau (không có văn bản nào ngoài khối):

---
title: "[Tiêu đề bài viết Blog phát triển từ bài đăng mạng xã hội]"
subtitle: "[Phụ đề nêu bật ý nghĩa và giá trị thông điệp]"
category: "[Chọn 1 trong các chuyên mục: ${catList}]"
tag: "[Thẻ hiển thị: Social Post, Company News, Event...]"
readTime: "4 mins read"
excerpt: "[Đoạn tóm tắt 2-3 câu làm nổi bật bài viết]"
authorName: "E-GEAD Editorial Board"
authorRole: "Brand Communications"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. [Tiêu đề phần 1: Bối cảnh và thông điệp khởi nguồn]
[Nội dung...]

## 2. [Tiêu đề phần 2: Những điểm sáng nổi bật trong hoạt động]
[Nội dung chi tiết...]
- Điểm nhấn 1
- Điểm nhấn 2

> "[Câu trích dẫn đắt giá truyền cảm hứng]"

## 3. [Tiêu đề phần 3: Ý nghĩa đối với hành trình phát triển của E-GEAD]
[Nội dung...]

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- Facebook: [facebook.com/EGEADCompany](https://www.facebook.com/EGEADCompany)
- LinkedIn: [linkedin.com/company/egead](https://www.linkedin.com/company/egead/)
- Email: contact@egeadcompany.com
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;
}

/**
 * Mẫu 3: Teambuilding & Thể thao (EGEAD Amazing Race)
 */
export const SAMPLE_TEAMBUILDING_MARKDOWN = `---
title: "EGEAD Amazing Race 2026: Bứt phá giới hạn – Chinh phục đỉnh cao"
subtitle: "Hành trình rực lửa năng lượng và tinh thần đồng đội quật cường của đại gia đình E-GEAD"
category: "Culture & People"
tag: "Teambuilding"
readTime: "5 mins read"
excerpt: "Chương trình Teambuilding thường niên EGEAD Amazing Race 2026 đã diễn ra đầy bùng nổ, khẳng định tinh thần dám dấn thân và sức mạnh của sự phối hợp ăn ý giữa các phòng ban."
authorName: "E-GEAD People & Culture"
authorRole: "Event Committee"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Hành trình bùng nổ năng lượng tại EGEAD Amazing Race 2026

Là sự kiện teambuilding được mong chờ nhất trong năm, **EGEAD Amazing Race 2026** đã quy tụ đông đảo nhân sự từ cả hai cơ sở Hà Nội và Đắk Lắk cùng hội ngộ và tranh tài.

Không còn ranh giới giữa các phòng ban Kỹ thuật, Vận hành, Marketing hay Thương mại, tất cả các thành viên đã hòa chung một nhịp đập, sẵn sàng đương đầu với mọi chướng ngại vật trên đường đua.

## 2. Những thử thách kịch tính và bài học phối hợp

Các trạm dừng chân được thiết kế nhằm thử thách cả thể lực lẫn trí tuệ và sự phối hợp đội nhóm:

- **Trạm Vượt Sóng:** Yêu cầu các thành viên giữ thăng bằng và vận chuyển hàng hóa giả lập trên địa hình trắc trở.
- **Trạm Mật Mã Công Nghệ:** Đòi hỏi tư duy giải mã nhanh và sự phân công nhiệm vụ chính xác trong tích tắc.
- **Trạm Về Đích Chung Lòng:** Khoảnh khắc toàn đội cùng nắm tay vượt qua vạch đích trong tiếng reo hò cổ vũ cuồng nhiệt.

> "Không một cá nhân nào có thể hoàn thành đường đua nếu thiếu đi sự yểm trợ và niềm tin của những người đồng đội bên cạnh."

## 3. Lan tỏa ngọn lửa nhiệt huyết vào công việc

Kết thúc giải đấu, chiếc cúp vô địch đã tìm được chủ nhân xứng đáng, nhưng giải thưởng lớn nhất chính là sự thấu hiểu và gắn kết bền chặt giữa mọi người.

Ngọn lửa nhiệt huyết của *Amazing Race* chắc chắn sẽ tiếp thêm sức mạnh để E-GEAD tiếp tục bứt phá các cột mốc doanh số và mục tiêu tăng trưởng trong chặng đường phía trước!

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- Email: contact@egeadcompany.com
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;

export function getTeambuildingPrompt(availableCategories: string[] = []): string {
  const catList = availableCategories.length > 0
    ? availableCategories.join(', ')
    : 'Culture & People, Company News, Operations';

  return `Bạn là chuyên gia truyền thông nội bộ tại E-GEAD Company.
Hãy viết bài viết tổng kết và truyền cảm hứng về chương trình Teambuilding E-GEAD (ví dụ: EGEAD Amazing Race, Du lịch dã ngoại, Hội thao doanh nghiệp...):
[ĐIỀN TÊN CHƯƠNG TRÌNH, ĐỊA ĐIỂM HOẶC CÁC HOẠT ĐỘNG CHÍNH]

Yêu cầu BẮT BUỘC: Hãy trả về bài viết CHÍNH XÁC theo cấu trúc Markdown có Frontmatter sau:

---
title: "[Tiêu đề bài viết hào hùng, giàu năng lượng, chuẩn SEO]"
subtitle: "[Phụ đề nêu bật thông điệp bứt phá và tinh thần đồng đội]"
category: "[Chọn 1 trong các chuyên mục: ${catList}]"
tag: "[Thẻ hiển thị: Teambuilding, Amazing Race, Team Spirit...]"
readTime: "5 mins read"
excerpt: "[Đoạn tóm tắt 2-3 câu làm nổi bật tinh thần teambuilding]"
authorName: "E-GEAD People & Culture"
authorRole: "Event Committee"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Khởi động đường đua tràn đầy nhiệt huyết
[Nội dung bối cảnh, tinh thần của các đội...]

## 2. Những trạm thử thách nghẹt thở và bài học hợp tác
[Mô tả các thử thách kịch tính và cách đồng đội sát cánh cùng nhau...]
- Thử thách 1
- Thử thách 2

> "[Câu trích dẫn đắt giá về sự tin tưởng và sức mạnh đoàn kết]"

## 3. Khẳng định tinh thần bứt phá của E-GEAD
[Ý nghĩa của sự kiện đối với hiệu suất làm việc và sự gắn kết...]

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- Email: contact@egeadcompany.com
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;
}

/**
 * Mẫu 4: Tuyển dụng & Môi trường làm việc (Employer Branding)
 */
export const SAMPLE_CAREER_BRANDING_MARKDOWN = `---
title: "Khám phá môi trường làm việc năng động và cơ hội bứt phá tại E-GEAD"
subtitle: "Nơi tài năng trẻ hội tụ, cùng kiến tạo giải pháp thương mại điện tử toàn cầu"
category: "Culture & People"
tag: "Careers & Culture"
readTime: "5 mins read"
excerpt: "Tìm hiểu văn hóa tôn trọng cá nhân, lộ trình thăng tiến minh bạch và môi trường làm việc cởi mở tại hai cơ sở Hà Nội và Đắk Lắk của E-GEAD."
authorName: "E-GEAD Talent Acquisition"
authorRole: "Human Resources"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Không gian làm việc khơi nguồn sáng tạo

Tại **E-GEAD**, chúng tôi tin rằng một không gian làm việc truyền cảm hứng là nền tảng cho những ý tưởng đột phá. 

Với hai cơ sở hiện đại đặt tại **Hà Nội** và **Đắk Lắk**, nhân sự E-GEAD được làm việc trong môi trường mở, trang thiết bị công nghệ tiên tiến cùng văn hóa trao quyền rõ ràng.

## 2. Vì sao nhân sự chọn gắn bó cùng E-GEAD?

- **Lộ trình thăng tiến minh bạch:** Đánh giá năng lực dựa trên kết quả thực tế và tinh thần trách nhiệm.
- **Văn hóa chia sẻ cởi mở:** Mọi ý kiến đóng góp từ thành viên mới đều được lắng nghe và tôn trọng.
- **Hoạt động nội bộ phong phú:** Từ giải đấu Amazing Race, Trung thu đoàn viên đến sinh nhật tháng đều được tổ chức chu đáo.

> "Gia nhập E-GEAD không chỉ là tìm kiếm một công việc, mà là cùng xây dựng một sự nghiệp vững chắc trong lĩnh vực E-Commerce toàn cầu."

## 3. Gia nhập đội ngũ E-GEAD ngay hôm nay!

Chúng tôi liên tục mở rộng và tìm kiếm các tài năng ở nhiều vị trí: Marketing, Vận hành E-Commerce, Quản lý kho WMS, Kỹ thuật AI...

---

### THÔNG TIN TUYỂN DỤNG & CÔNG TY EGEAD
- Website tuyển dụng: [egeadcompany.com/careers](https://egeadcompany.com/careers)
- Email nhận CV: contact@egeadcompany.com
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;

export function getCareerBrandingPrompt(availableCategories: string[] = []): string {
  const catList = availableCategories.length > 0
    ? availableCategories.join(', ')
    : 'Culture & People, Careers & Culture, Company News';

  return `Bạn là chuyên gia Tuyển dụng & Xây dựng thương hiệu nhà tuyển dụng (Employer Branding) tại E-GEAD Company.
Hãy viết bài giới thiệu văn hóa và môi trường làm việc tại E-GEAD để thu hút nhân tài gia nhập đội ngũ:
[ĐIỀN VỊ TRÍ HOẶC CHỦ ĐỀ: Ví dụ "Môi trường làm việc năng động tại Đắk Lắk & Hà Nội", "Cơ hội cho nhân tài trẻ ngành E-Commerce"...]

Yêu cầu BẮT BUỘC: Hãy trả về bài viết CHÍNH XÁC theo cấu trúc Markdown có Frontmatter sau:

---
title: "[Tiêu đề bài viết tuyển dụng hấp dẫn, chuẩn SEO]"
subtitle: "[Phụ đề ngắn nêu bật giá trị phúc lợi và cơ hội]"
category: "[Chọn 1 trong các chuyên mục: ${catList}]"
tag: "[Thẻ hiển thị: Careers, Hiring, Work Culture...]"
readTime: "5 mins read"
excerpt: "[Đoạn tóm tắt 2-3 câu giới thiệu cơ hội nghề nghiệp]"
authorName: "E-GEAD Talent Acquisition"
authorRole: "Human Resources"
heroImage: "/assets/case_brother.jpg"
status: "published"
---

## 1. Môi trường làm việc mở và văn hóa trao quyền
[Nội dung mô tả văn phòng tại Đắk Lắk & Hà Nội...]

## 2. Những lý do bạn nên trở thành một phần của E-GEAD
[Chính sách đãi ngộ, văn hóa học tập, teambuilding...]
- Lý do 1
- Lý do 2

> "[Câu trích dẫn ngắn truyền cảm hứng nghề nghiệp]"

## 3. Cơ hội nghề nghiệp và lời mời ứng tuyển
[Thông tin liên hệ ứng tuyển...]

---

### THÔNG TIN CÔNG TY EGEAD
- Website: [egeadcompany.com](https://egeadcompany.com)
- Email: contact@egeadcompany.com
- CS1: 217/9 Ngô Quyền, P.Tân An, Tỉnh Đắk Lắk
- CS2: 157 Cầu Diễn, Phúc Diễn, Hà Nội
`;
}

/**
 * Mẫu 5: Chiến lược & Cẩm nang E-Commerce (Mẫu phân tích thị trường)
 */
export const SAMPLE_AI_BLOG_MARKDOWN = `---
title: "Chiến lược mở rộng thương mại điện tử xuyên biên giới 2026: Đột phá chuỗi cung ứng"
subtitle: "Bí quyết tối ưu hóa chi phí fulfillment và gia tăng tỷ lệ chuyển đổi cho nhà bán hàng toàn cầu"
category: "E-Commerce Strategy"
tag: "Cross-border Logistics"
readTime: "6 mins read"
excerpt: "Phân tích toàn diện lộ trình chuyển đổi chuỗi cung ứng thương mại điện tử xuyên biên giới, kết hợp AI dự báo nhu cầu và mạng lưới kho thông minh đa quốc gia."
authorName: "E-GEAD Research Team"
authorRole: "Global Commerce Strategist"
heroImage: "/assets/case_brother.jpg"
status: "draft"
---

## 1. Bối cảnh thương mại điện tử xuyên biên giới 2026

Thương mại điện tử xuyên biên giới đang chứng kiến sự chuyển dịch mạnh mẽ từ mô hình vận chuyển đơn lẻ sang hệ sinh thái fulfillment phi tập trung. Các nhà bán hàng không còn chỉ cạnh tranh về giá mà cạnh tranh bằng tốc độ giao hàng và trải nghiệm bản địa hóa.

- Chi phí logistics chiếm tới 28% tổng doanh thu bán hàng quốc tế.
- Khách hàng mong đợi thời gian nhận hàng dưới 3 ngày làm việc đối với đơn hàng liên lục địa.

## 2. Ba trụ cột tái định hình chuỗi cung ứng

Để tồn tại và chiếm lĩnh thị phần, các doanh nghiệp cần tập trung vào 3 giải pháp nền tảng:

### 2.1. Ứng dụng AI dự báo và luân chuyển hàng tồn kho
Hệ thống máy học tự động phân tích dữ liệu mua sắm theo mùa vụ và thời tiết cục bộ để phân bổ hàng hóa về các kho vệ tinh trước 15 ngày so với cao điểm.

### 2.2. Kho thông minh tự động hóa (Micro-fulfillment)
- Tối ưu hóa không gian lưu trữ lên đến 40%.
- Giảm thiểu sai sót bốc dỡ hàng xuống dưới 0.01%.

> "Tốc độ và độ chính xác trong hoàn tất đơn hàng là yếu tố quyết định 70% mức độ trung thành của người mua sắm quốc tế."

## 3. Kết luận và khuyến nghị hành động

Doanh nghiệp cần nhanh chóng rà soát lại toàn bộ quy trình fulfillment hiện tại, tích hợp các nền tảng quản trị kho đám mây và chuẩn bị nguồn lực cho mùa mua sắm cuối năm.`;

export function getAIBlogPromptTemplate(availableCategories: string[] = []): string {
  const catList = availableCategories.length > 0
    ? availableCategories.join(', ')
    : 'E-Commerce Strategy, Operations, Technology, Market Expansion';

  return `Bạn là chuyên gia cố vấn chiến lược thương mại điện tử quốc tế tại E-GEAD.
Hãy viết một bài viết phân tích chuyên sâu chất lượng cao về chủ đề [ĐIỀN CHỦ ĐỀ CỦA BẠN TẠI ĐÂY].

Yêu cầu BẮT BUỘC: Hãy trả về bài viết CHÍNH XÁC theo cấu trúc Markdown có Frontmatter dưới đây (không viết lời chào, không thêm bất kỳ văn bản nào bên ngoài khối):

---
title: "[Tiêu đề bài viết hấp dẫn, chuẩn SEO]"
subtitle: "[Phụ đề ngắn gọn nêu bật giá trị thực thi]"
category: "[Chọn 1 trong các chuyên mục sau: ${catList}]"
tag: "[Thẻ hiển thị, ví dụ: Cross-border, Omnichannel, AI & Robotics, Logistics...]"
readTime: "5 mins read"
excerpt: "[Đoạn tóm tắt súc tích khoảng 2-3 câu làm nổi bật bài viết]"
authorName: "E-GEAD Research Team"
authorRole: "Global Commerce Strategist"
heroImage: "/assets/case_brother.jpg"
status: "draft"
---

## 1. Bối cảnh thị trường và thách thức
[Nội dung phân tích bối cảnh, thực trạng...]

## 2. Các trụ cột chiến lược cần triển khai
[Nội dung chi tiết, có thể dùng danh sách checklist:]
- Điểm mấu chốt 1
- Điểm mấu chốt 2

### 2.1. Đòn bẩy công nghệ và tự động hóa
[Chi tiết giải pháp công nghệ...]

## 3. Lộ trình thực thi cho doanh nghiệp
[Các bước hành động cụ thể...]

> "Trích dẫn quan trọng hoặc thông điệp cốt lõi nhấn mạnh giá trị hành động cho nhà lãnh đạo."

## 4. Kết luận
[Tóm tắt và định hướng tương lai...]
`;
}

/**
 * Danh sách toàn bộ các mẫu Prompt và Dữ liệu mẫu phong phú
 */
export const AI_BLOG_TEMPLATES: BlogPromptTemplate[] = [
  {
    id: 'culture-events',
    name: 'Sự kiện nội bộ & Văn hóa E-GEAD',
    description: 'Viết bài về hoạt động nội bộ: Trung thu đoàn viên, sinh nhật tháng, lễ hội, gắn kết nhân sự',
    badge: 'Văn hóa & Đời sống',
    category: 'Culture & People',
    tag: 'Company Culture',
    prompt: getCultureEventsPrompt,
    sampleMarkdown: SAMPLE_CULTURE_EVENT_MARKDOWN,
  },
  {
    id: 'social-to-blog',
    name: 'Biến bài đăng Facebook thành Blog chuẩn SEO',
    description: 'Dán bài viết ngắn từ Fanpage Facebook hoặc LinkedIn, AI tự động mở rộng thành bài Blog chuyên nghiệp',
    badge: 'Facebook to Blog',
    category: 'Company News',
    tag: 'Social Spotlight',
    prompt: getSocialToBlogPrompt,
    sampleMarkdown: SAMPLE_SOCIAL_TO_BLOG_MARKDOWN,
  },
  {
    id: 'teambuilding',
    name: 'Teambuilding & Thể thao (Amazing Race)',
    description: 'Viết bài về chương trình teambuilding, Amazing Race 2026, tinh thần vượt thử thách và gắn kết',
    badge: 'Teambuilding',
    category: 'Culture & People',
    tag: 'Teambuilding',
    prompt: getTeambuildingPrompt,
    sampleMarkdown: SAMPLE_TEAMBUILDING_MARKDOWN,
  },
  {
    id: 'strategy-ecommerce',
    name: 'Chiến lược & Cẩm nang E-Commerce',
    description: 'Phân tích thị trường quốc tế, chuỗi cung ứng, logistics, TikTok Shop, AI & công nghệ bán lẻ',
    badge: 'Chuyên gia & Chiến lược',
    category: 'E-Commerce Strategy',
    tag: 'Cross-border Logistics',
    prompt: getAIBlogPromptTemplate,
    sampleMarkdown: SAMPLE_AI_BLOG_MARKDOWN,
  },
  {
    id: 'career-branding',
    name: 'Tuyển dụng & Môi trường làm việc',
    description: 'Giới thiệu cơ hội nghề nghiệp, trải nghiệm làm việc tại văn phòng Đắk Lắk và Hà Nội',
    badge: 'Tuyển dụng',
    category: 'Culture & People',
    tag: 'Careers & Culture',
    prompt: getCareerBrandingPrompt,
    sampleMarkdown: SAMPLE_CAREER_BRANDING_MARKDOWN,
  },
];
