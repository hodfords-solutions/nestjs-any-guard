import { CanActivate, Injectable, OnModuleInit, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

/* * ShortCircuitingGuard is a guard that allows the first guard that returns true to pass.
 * If no guard returns true, it will return true by default.
 * This is useful for cases where you want to have multiple guards
 * and only one of them needs to pass for the request to be allowed.
 * It is a way to combine multiple guards into one.
 */
export function FirstSuccessGuard(...guards: Type<CanActivate>[]): { new (...args: any): CanActivate } {
    @Injectable()
    class ShortCircuitingGuardImpl implements CanActivate, OnModuleInit {
        private guards: CanActivate[] = [];

        constructor(private moduleRef: ModuleRef) {}

        async onModuleInit() {
            for (const guard of guards) {
                const guardInstance = this.moduleRef.get(guard, { strict: false });
                this.guards.push(guardInstance);
            }
        }

        async canActivate(context: ExecutionContext): Promise<boolean> {
            for (const guard of this.guards) {
                const result = await guard.canActivate(context);
                if (result) {
                    return true;
                }
            }
            return false;
        }
    }
    return ShortCircuitingGuardImpl;
}
