import { AuthProvider } from '../components/AuthContext';
import { AdminLayoutWrapper } from '../components/AdminLayoutWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutWrapper>
        {children}
      </AdminLayoutWrapper>
    </AuthProvider>
  );
}