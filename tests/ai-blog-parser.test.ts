import { describe, test, expect } from 'bun:test';
import {
  generateSlug,
  markdownToHtml,
  parseAIBlogContent,
  getAIBlogPromptTemplate,
  SAMPLE_AI_BLOG_MARKDOWN,
} from '../lib/utils/aiBlogParser';

describe('AI Blog Parser Unit Tests', () => {
  describe('generateSlug', () => {
    test('converts Vietnamese text with accents to clean slug', () => {
      const input = 'Chiến Lược Thương Mại Điện Tử Xuyên Biên Giới 2026';
      const expected = 'chien-luoc-thuong-mai-dien-tu-xuyen-bien-gioi-2026';
      expect(generateSlug(input)).toBe(expected);
    });

    test('handles special characters and symbols', () => {
      const input = 'E-GEAD & AI: What\'s Next in 2026?!';
      expect(generateSlug(input)).toBe('e-gead-ai-what-s-next-in-2026');
    });

    test('returns empty string on empty input', () => {
      expect(generateSlug('')).toBe('');
    });
  });

  describe('markdownToHtml', () => {
    test('converts headings, lists, bold and paragraphs correctly', () => {
      const md = `## Tieu de 2
Đây là đoạn văn có **in đậm** và *in nghiêng*.

- Mục danh sách 1
- Mục danh sách 2

> Đây là trích dẫn`;

      const html = markdownToHtml(md);
      expect(html).toContain('<h2>Tieu de 2</h2>');
      expect(html).toContain('<strong>in đậm</strong>');
      expect(html).toContain('<em>in nghiêng</em>');
      expect(html).toContain('<ul><li>Mục danh sách 1</li><li>Mục danh sách 2</li></ul>');
      expect(html).toContain('<blockquote><p>Đây là trích dẫn</p></blockquote>');
    });

    test('converts code blocks and tables', () => {
      const md = `\`\`\`
const x = 10;
\`\`\`

| Tiêu đề 1 | Tiêu đề 2 |
| --- | --- |
| Giá trị 1 | Giá trị 2 |`;

      const html = markdownToHtml(md);
      expect(html).toContain('<pre><code>const x = 10;</code></pre>');
      expect(html).toContain('<table');
      expect(html).toContain('Tiêu đề 1');
      expect(html).toContain('Giá trị 1');
    });
  });

  describe('parseAIBlogContent', () => {
    test('parses Markdown with Frontmatter correctly', () => {
      const parsed = parseAIBlogContent(SAMPLE_AI_BLOG_MARKDOWN);

      expect(parsed.title).toBe(
        'Chiến lược mở rộng thương mại điện tử xuyên biên giới 2026: Đột phá chuỗi cung ứng'
      );
      expect(parsed.subtitle).toBe(
        'Bí quyết tối ưu hóa chi phí fulfillment và gia tăng tỷ lệ chuyển đổi cho nhà bán hàng toàn cầu'
      );
      expect(parsed.category).toBe('E-Commerce Strategy');
      expect(parsed.tag).toBe('Cross-border Logistics');
      expect(parsed.readTime).toBe('6 mins read');
      expect(parsed.authorName).toBe('E-GEAD Research Team');
      expect(parsed.status).toBe('draft');
      expect(parsed.contentHtml).toContain('<h2>1. Bối cảnh thương mại điện tử xuyên biên giới 2026</h2>');
      expect(parsed.contentHtml).toContain('Chi phí logistics chiếm tới 28%');
    });

    test('parses wrapped code fence ```markdown ... ```', () => {
      const wrapped = `\`\`\`markdown\n${SAMPLE_AI_BLOG_MARKDOWN}\n\`\`\``;
      const parsed = parseAIBlogContent(wrapped);
      expect(parsed.title).toContain('Chiến lược mở rộng');
    });

    test('parses JSON format directly', () => {
      const jsonInput = JSON.stringify({
        title: 'JSON AI Title Post',
        subtitle: 'Sub subtitle here',
        category: 'Technology',
        tag: 'AI Tools',
        content: '## Heading 2\n\nContent in markdown',
      });

      const parsed = parseAIBlogContent(jsonInput);
      expect(parsed.title).toBe('JSON AI Title Post');
      expect(parsed.category).toBe('Technology');
      expect(parsed.contentHtml).toContain('<h2>Heading 2</h2>');
    });

    test('parses raw markdown without frontmatter by inferring title and excerpt', () => {
      const rawText = `# Tiêu đề tự động suy ra
Đoạn đầu tiên làm tóm tắt ngắn.

Nội dung tiếp theo của bài viết phân tích.`;

      const parsed = parseAIBlogContent(rawText);
      expect(parsed.title).toBe('Tiêu đề tự động suy ra');
      expect(parsed.excerpt).toBe('Đoạn đầu tiên làm tóm tắt ngắn.');
      expect(parsed.contentHtml).toContain('Nội dung tiếp theo của bài viết phân tích.');
    });

    test('throws descriptive error on empty input', () => {
      expect(() => parseAIBlogContent('')).toThrow('Nội dung nhập vào không được để trống.');
    });
  });

  describe('getAIBlogPromptTemplate', () => {
    test('includes available categories in the prompt instruction', () => {
      const prompt = getAIBlogPromptTemplate(['Category Alpha', 'Category Beta']);
      expect(prompt).toContain('Category Alpha, Category Beta');
      expect(prompt).toContain('title: "[Tiêu đề bài viết');
      expect(prompt).toContain('category: "[Chọn 1 trong các chuyên mục');
    });
  });
});
