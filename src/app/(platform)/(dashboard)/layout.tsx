import { NavBar } from './_components/navbar';

type DashboardLayoutProps = Readonly<{ children: React.ReactNode }>;

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='h-full'>
      <NavBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
