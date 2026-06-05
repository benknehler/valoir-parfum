import AdminShell from '../../components/admin/AdminShell';

export const metadata = {
  title: 'Valoir Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
