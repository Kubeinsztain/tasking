import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { BoardNavbar } from './_components/board-navbar';

type Params = { boardId: string };

type BoardIdLayoutProps = {
  children: React.ReactNode;
  params: Params;
};

export async function generateMetadata({ params }: { params: Params }) {
  const { orgId } = auth();

  if (!orgId) {
    return { title: 'Board' };
  }

  const board = await db.board.findUnique({
    where: { id: params.boardId, orgId },
  });

  return {
    title: board?.title || 'Board',
  };
}

const BoardIdLayout = async ({ children, params }: BoardIdLayoutProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect('/select-org');
  }

  const board = await db.board.findFirst({
    where: { id: params.boardId, orgId },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className='relative h-full bg-no-repeat bg-cover bg-center'
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className='absolute inset-0 bg-black/10' />
      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
