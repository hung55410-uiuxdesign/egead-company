export interface SapAdvantageItem {
  id: string;
  metric: string;
  description: string;
  iconName: 'years' | 'delivery' | 'engineers' | 'support';
}

export interface SapExpertiseItem {
  id: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageFallback: string;
  alt: string;
}

export interface SapWhyItem {
  id: string;
  title: string;
  content: string;
}

export interface SapCaseStudyItem {
  id: string;
  slug: string;
  customer: string;
  title: string;
  tags: string[];
  image: string;
}
