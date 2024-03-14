import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

type PlatformLayoutProps = Readonly<{ children: React.ReactNode }>;

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
