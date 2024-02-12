'use client';

import { createBoard } from '@/actions/create-board';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, 'Success');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div>
        <input
          className='border-black border p-1'
          id='title'
          name='title'
          required
          placeholder='Enter a board title'
        />
        {fieldErrors &&
          fieldErrors?.title?.map((err) => (
            <p key={err} className='text-rose-500'>
              {err}
            </p>
          ))}
      </div>
      <Button type='submit'>Submit</Button>
    </form>
  );
};
