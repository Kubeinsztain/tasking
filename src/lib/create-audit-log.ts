import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from '@/lib/db';

type Props = {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
};

export const createAuditLog = async ({
  entityId,
  entityType,
  entityTitle,
  action,
}: Props) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!orgId || !user) {
      throw new Error('User not found');
    }

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        entityId,
        entityType,
        entityTitle,
        action,
        userImage: user?.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    });
  } catch (err) {
    console.error('[AUDIT_LOG_ERROR]', err);
  }
};
