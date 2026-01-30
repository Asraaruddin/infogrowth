import { RecruiterAuthProvider } from '../../components/RecruiterAuthContext';
import { RecruiterLayoutWrapper } from '../../components/RecruiterLayoutWrapper';

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecruiterAuthProvider>
      <RecruiterLayoutWrapper>
        {children}
      </RecruiterLayoutWrapper>
    </RecruiterAuthProvider>
  );
}