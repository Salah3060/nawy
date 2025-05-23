//NestJS
import { SetMetadata } from '@nestjs/common';

//Enums
import { MenuItems } from '../enums/menu-item.enum';
import { REQUIRED_MENU_ITEM } from '../guards/user-policy.guard';

export const RequireMenuItem = (menuItem: MenuItems) =>
  SetMetadata(REQUIRED_MENU_ITEM, menuItem);
