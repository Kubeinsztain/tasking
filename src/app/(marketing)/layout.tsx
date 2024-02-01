import { Footer } from './_components/footer';
import { NavBar } from './_components/navbar';

type MarketingLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
  return (
    <div className='h-full bg-slate-100'>
      <NavBar />
      <main className='pt-40 pb-20 bg-slate-100'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
