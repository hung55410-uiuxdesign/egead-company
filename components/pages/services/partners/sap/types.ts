export interface SapAdvantageItem {
  id?: string;
  metric?: string;
  title?: string;
  headline?: string;
  description?: string;
  content?: string;
  tag?: string;
  iconName?: 'years' | 'delivery' | 'engineers' | 'support' | string;
}

export interface SapExpertiseItem {
  id?: string;
  title: string;
  paragraphs?: string[];
  description?: string;
  tag?: string;
  image?: string;
  imageFallback?: string;
  alt?: string;
}

export interface SapWhyItem {
  id?: string;
  title: string;
  content?: string;
  description?: string;
}

export interface SapCaseStudyItem {
  id?: string;
  slug?: string;
  href?: string;
  customer?: string;
  title: string;
  tags?: string[];
  badge?: string;
  category?: string;
  description?: string;
  image?: string;
}


export interface PartnerHeroData {
  name: string;
  badge?: string;
  bannerImage: string;
  bannerFallback?: string;
  bannerAlt?: string;
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface PartnerWhyData {
  titlePrefix?: string;
  headline?: string;
  description?: string;
  items: SapWhyItem[];
}

export interface PartnerCtaData {
  headingPart1?: string;
  headingHighlight?: string;
  headingPart2?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface PartnerDetailData {
  slug: string;
  name: string;
  metaTitle?: string;
  metaDescription?: string;
  hero: PartnerHeroData;
  advantages: {
    subtitle?: string;
    headline?: string;
    items: SapAdvantageItem[];
  };
  expertise: {
    subtitle?: string;
    headline?: string;
    items: SapExpertiseItem[];
  };
  why: PartnerWhyData;
  caseStudies: {
    subtitle?: string;
    headline?: string;
    items: SapCaseStudyItem[];
  };
  cta: PartnerCtaData;
}

