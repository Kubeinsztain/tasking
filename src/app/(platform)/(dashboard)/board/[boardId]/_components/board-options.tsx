'use client';

import { deleteBoard } from '@/actions/delete-board';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { MoreHorizontal, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

type BoardOptionsProps = {
  id: string;
};

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute: doDeleteBoard, isLoading: isDeletePending } = useAction(
    deleteBoard,
    {
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const onDelete = () => {
    doDeleteBoard({ id });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className='h-auto w-auto p-2' variant='transparent'>
            <MoreHorizontal className='h-5 w-5' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='px-0 pt-3 pb-3' side='bottom' align='start'>
          <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
            Board Actions
          </div>
          <PopoverClose asChild>
            <Button
              variant='ghost'
              className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            >
              <X className='h-4 w-4' />
            </Button>
          </PopoverClose>
          <Button
            variant='ghost'
            onClick={onDelete}
            disabled={isDeletePending}
            className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Delete this board
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
