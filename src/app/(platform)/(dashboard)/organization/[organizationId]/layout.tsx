import { OrgControl } from './_components/org-control';

type OrganizationIdLayoutProps = Readonly<{ children: React.ReactNode }>;

const OrganizationIdLayout = ({ children }: OrganizationIdLayoutProps) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
