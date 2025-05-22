// Nest

import { Types } from 'mongoose';

export const stringToObjectId = (
  id: string | null,
): Types.ObjectId | undefined => {
  if (!id || !Types.ObjectId.isValid(id)) {
    return undefined;
  }
  return new Types.ObjectId(id);
};
