'use client';

import { updateCard } from '@/actions/update-card';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import { CardWithList } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type DescriptionProps = {
  data: CardWithList;
};

export const Description = ({ data }: DescriptionProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const textareaRef = useRef<ElementRef<'textarea'>>(null);
  const formRef = useRef<ElementRef<'form'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: () => {
      disableEditing();
      queryClient.invalidateQueries({
        queryKey: ['card', data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['card-logs', data.id],
      });
      toast.success('Card updated');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get('description') as string;
    const boardId = params.boardId as string;

    // TODO call execute
    execute({ id: data.id, boardId, description });
  };

  return (
    <div className='flex items-start gap-x-3'>
      <AlignLeft className='h-5 w-5 mt-0.5 text-neutral-700' />
      <div className='w-full'>
        <p className='font-semibold text-neutral-700 mb-2'>Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className='space-y-2'>
            <FormTextarea
              id='description'
              ref={textareaRef}
              className='w-full mt-2'
              placeholder='Here you can add description...'
              errors={fieldErrors}
              defaultValue={data.description || undefined}
            />
            <div className='flex items-center gap-x-2'>
              <FormSubmit>Save</FormSubmit>
              <Button
                type='button'
                size='sm'
                variant='ghost'
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role='button'
            className='min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md'
            onClick={enableEditing}
          >
            {data.description || 'Here you can add description...'}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeletion() {
  return (
    <div className='flex items-start gap-x-3 w-full'>
      <Skeleton className='h-6 w-6 bg-neutral-200' />
      <div className='w-full'>
        <Skeleton className='h-6 w-24 mb-2 bg-neutral-200' />
        <Skeleton className='w-full h-[78px] bg-neutral-200' />
      </div>
    </div>
  );
};
