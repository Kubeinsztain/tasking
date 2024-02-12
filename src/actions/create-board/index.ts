'use server';

import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId } = auth();

  if (!userId) {
    return { error: 'Unauthorized' };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (err) {
    return { error: 'Database error' };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
