export interface CaseStudyItem {
  id: string;
  slug?: string;
  customer: string;
  title: string;
  description: string;
  image: string;
  services: string[];
  industries: string[];
  tags: string[];
  highlight?: string;
  order?: number;
}
