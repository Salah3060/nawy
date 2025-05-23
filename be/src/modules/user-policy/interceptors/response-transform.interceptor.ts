//NestJs
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

//RxJs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserPolicyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const path = request.route.path;

        // Check if this is a creation - update - delete endpoint for user policy
        if (path.includes('user-policy')) {
          return {
            message: 'success',
            res: {
              userPolicy: data,
            },
            messageCode: 19,
          };
        }

        // Default response format for other endpoints
        return data;
      }),
    );
  }
}
