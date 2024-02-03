import { ClerkProvider } from '@clerk/nextjs';

type PlatformLayoutProps = Readonly<{ children: React.ReactNode }>;

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
