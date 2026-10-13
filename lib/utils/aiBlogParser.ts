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

/**
 * Generate standard AI prompt template with list of available categories
 */
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
 * Realistic sample AI blog markdown for testing
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
