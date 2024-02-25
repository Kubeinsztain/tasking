'use client';

import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { unsplash } from '@/lib/unsplash';
import { cn, shuffle } from '@/lib/utils';
import { defaultImages } from '@/constants/images';
import Link from 'next/link';
import { FormErrors } from './form-errors';

type FormPickerProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>(
    shuffle(defaultImages).slice(0, 9)
  );
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const result = await unsplash.photos.getRandom({
  //         collectionIds: ['317099'],
  //         count: 9,
  //       });

  //       if (result && result.response) {
  //         const newImages = result.response as Array<Record<string, any>>;
  //         setImages(newImages);
  //       } else {
  //         console.error('No response from Unsplash');
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setImages([]);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className='p-6 flex items-center justify-center'>
  //       <Loader2 className='w-6 h-6 text-sky-700 animate-spin' />
  //     </div>
  //   );
  // }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              id={id}
              type='radio'
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              className='object-cover rounded-sm'
              alt='Unsplash Image'
              fill
              src={image.urls.thumb}
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center'>
                <Check className='h-4 w-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  );
};
