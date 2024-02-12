'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteDashboard(id: string) {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath('/organizations/org_2brcfizE9LtQrrb48uD7kPHEKdz');
}
