import type { FooterNavColumn } from '../types';

export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    title: 'What we do',
    links: [
      { label: 'Our Work', href: '/our-work' },
      { label: 'Our Services', href: '/services/all-services' },
      { label: 'Our Partners', href: '/partners' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Company', href: '/company' },
      { label: 'Our People', href: '/people' },
      { label: 'Careers', href: '/careers' },
      { label: 'Testimonials', href: '/testimonial' },
      { label: 'Insights', href: '/insights' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'Contact', href: '/contact-us' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/privacy-policy' },
    ],
  },
];
