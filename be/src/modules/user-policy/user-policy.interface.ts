//NestJS
import { Types } from 'mongoose';

// Enums
import { MenuItems } from './enums/menu-item.enum';
export interface UserPolicyInterface {
  _id?: Types.ObjectId;
  role?: string;
  menuItems?: MenuItems[];
  companyId?: Types.ObjectId;
  isDeleted?: boolean;
}
