import { deleteDashboard } from '@/actions/deleteDashboard';
import { Button } from '@/components/ui/button';

type BoardProps = {
  title: string;
  id: string;
};

export const Board = ({ id, title }: BoardProps) => {
  const deleteBoardWithId = deleteDashboard.bind(null, id);

  return (
    <form action={deleteBoardWithId} className='flex items-center gap-x-2'>
      <p>Board title: {title}</p>
      <Button variant='destructive' size='sm' type='submit'>
        Delete
      </Button>
    </form>
  );
};
