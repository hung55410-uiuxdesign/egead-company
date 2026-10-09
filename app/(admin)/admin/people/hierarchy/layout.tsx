import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sơ đồ tổ chức & Squads — E-GEAD Admin',
};

export default function PeopleHierarchyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col flex-1 min-h-0">
      {children}
    </div>
  );
}
