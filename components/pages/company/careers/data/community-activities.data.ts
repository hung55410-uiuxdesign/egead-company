type CommunityActivity = {
  title: string;
  location: string;
  image: string;
  desc: string;
}

export const COMMUNITY_ACTIVITIES: CommunityActivity[] = [
  {
    title: 'Highland Youth Tech Education Sponsorship',
    location: 'Buon Ma Thuot, Dak Lak',
    image: '/assets/case_manulife.jpg',
    desc: 'Providing programming scholarships, laptops, and mentorship to aspiring software engineers in the Central Highlands.',
  },
  {
    title: 'Maison Chance Vocational Training Support',
    location: 'Vietnam Delivery Center',
    image: '/assets/case_brother.jpg',
    desc: 'Empowering disadvantaged youth with practical digital commerce, packaging, and design skill training.',
  },
  {
    title: 'Green Highlands Community Tree Planting',
    location: 'Dak Lak Province',
    image: '/assets/case_suntory.jpg',
    desc: 'Partnering with local forestry teams to offset logistics emissions through sustainable reforestation initiatives.',
  },
];
