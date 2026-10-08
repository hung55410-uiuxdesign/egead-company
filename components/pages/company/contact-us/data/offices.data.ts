type OfficeItem = {
  country: string;
  city: string;
  address: string;
  email: string;
  type: string;
}

export const OFFICES: OfficeItem[] = [
  {
    country: 'Vietnam',
    city: 'Buon Ma Thuot City, Dak Lak Province',
    address: '217/9 Ngo Quyen Street, Tan An Ward, Buon Ma Thuot City, Dak Lak Province, Vietnam',
    email: 'support@egead.com',
    type: 'Headquarters & Engineering Hub',
  },
  {
    country: 'United States',
    city: 'California & East Coast Centers',
    address: 'High-throughput 23-inch POD manufacturing lines and WMS distribution facilities',
    email: 'contact@egeadcompany.com',
    type: 'US Production & Logistics Network',
  },
  {
    country: 'International Support',
    city: 'US, UK & EU Timezones',
    address: '24/7 client support and real-time SLA operations monitoring',
    email: 'support@egead.com',
    type: '24/7 Operations Desk',
  },
  {
    country: 'Global Developers',
    city: 'Remote & Cloud',
    address: 'RESTful API integration, webhook endpoints, and ERP synchronization',
    email: 'contact@egeadcompany.com',
    type: 'Developer Hub',
  },
];
