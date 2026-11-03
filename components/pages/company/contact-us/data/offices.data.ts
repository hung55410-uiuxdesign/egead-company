export interface OfficeItem {
  id: string;
  country: string;
  city: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
}

export const OFFICES_DATA: OfficeItem[] = [
  {
    id: 'vietnam-bmt',
    country: 'Vietnam',
    city: 'Buon Ma Thuot',
    company: 'E-GEAD Company Limited',
    address: '217/9 Ngo Quyen Street, Tan An Ward, Buon Ma Thuot City, Dak Lak Province, Vietnam',
    phone: '077 613 9999',
    email: 'contact@egeadcompany.com',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  {
    id: 'vietnam-hanoi',
    country: 'Vietnam',
    city: 'Hanoi',
    company: 'E-GEAD Company Limited',
    address: '157 Cầu Diễn, Phúc Diễn, Hà Nội',
    phone: '077 613 9999',
    email: 'contact@egeadcompany.com',
    timezone: 'Asia/Ho_Chi_Minh',
  },
];
