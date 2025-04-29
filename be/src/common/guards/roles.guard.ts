// Nest
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles metadata set via @Roles() decorator
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // Get the request and the user attached by the JwtStrategy
    const { user } = context.switchToHttp().getRequest();

    // If no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    // Check if the user's role is one of the required roles
    return requiredRoles.includes(user.role);
  }
}
