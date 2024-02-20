import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

type PlatformLayoutProps = Readonly<{ children: React.ReactNode }>;

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
