'use client';

import { createBoard } from '@/actions/create-board';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { useAction } from '@/hooks/use-action';

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
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
        <FormInput id='title' label='Board Title' errors={fieldErrors} />
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
};
