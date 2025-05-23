// NestJS
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

// Lib
import { Reflector } from '@nestjs/core';
import { Types } from 'mongoose';

// Services
import { UserPolicyService } from '../user-policy.service';

//Enums
import { MenuItems } from '../enums/menu-item.enum';

// Custom decorator key
export const REQUIRED_MENU_ITEM = 'required-menu-item';

@Injectable()
export class UserPolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userPolicyService: UserPolicyService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required menu item from the endpoint decorator
    const requiredMenuItem = this.reflector.get<MenuItems>(
      REQUIRED_MENU_ITEM,
      context.getHandler(),
    );

    // If no menu item is required, allow access
    if (!requiredMenuItem) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Get user's role
    let { role, companyId } = user;

    companyId = new Types.ObjectId('682e7b0828949999ab4a3bf0'); // TODO: remove this line just for testing

    // Get user policy for this role and company
    const userPolicy = await this.userPolicyService.getUserPolicy(
      role,
      companyId,
    );

    // Check if user policy exists and contains the required menu item
    if (!userPolicy || !userPolicy.menuItems) {
      throw new UnauthorizedException({
        message: 'failure',
        details: 'Access denied: No policy found for this role',
        messageCode: 16,
      });
    }

    // Check if the user's menu items include the required one
    const hasAccess = userPolicy.menuItems.includes(requiredMenuItem);

    if (!hasAccess) {
      throw new UnauthorizedException({
        message: 'failure',
        details: `Access denied: You don't have access to ${requiredMenuItem}`,
        messageCode: 17,
      });
    }

    return true;
  }
}
