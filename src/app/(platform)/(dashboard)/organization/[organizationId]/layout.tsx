import { auth } from '@clerk/nextjs';
import { startCase } from 'lodash';
import { OrgControl } from './_components/org-control';

type OrganizationIdLayoutProps = Readonly<{ children: React.ReactNode }>;

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || 'organization'),
  };
}

const OrganizationIdLayout = ({ children }: OrganizationIdLayoutProps) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationIdLayout;
