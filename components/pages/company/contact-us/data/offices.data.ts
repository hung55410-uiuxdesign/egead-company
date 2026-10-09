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
    city: 'Buôn Ma Thuột',
    company: 'E-GEAD Company Limited',
    address: '217/9 Ngô Quyền, Phường Tân An, TP. Buôn Ma Thuột, Tỉnh Đắk Lắk, Việt Nam',
    phone: '+84 (0) 90 541 4410',
    email: 'contact@egead-company.com',
    timezone: 'Asia/Ho_Chi_Minh',
  },
];
