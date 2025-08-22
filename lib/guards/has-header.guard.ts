import { CanActivate, Injectable } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

/**
 * HasHeaderGuard checks if a specific header is present in the request.
 * If the header is present and its value is 'true', it allows the request to proceed.
 * Otherwise, it denies access.
 */
export function HasHeaderGuard(key: string): { new (...args: any): CanActivate } {
    @Injectable()
    class HasHeaderGuardImpl implements CanActivate {
        canActivate(context: ExecutionContext): boolean {
            const request = context.switchToHttp().getRequest();
            return request.headers[key] === 'true';
        }
    }
    return HasHeaderGuardImpl;
}
