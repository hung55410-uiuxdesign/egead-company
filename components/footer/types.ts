export interface TimezoneLocation {
  name: string;
  tz: string;
}

export interface FooterNavLink {
  label: string;
  href: string;
}

export interface FooterNavColumn {
  title: string;
  links: FooterNavLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}
