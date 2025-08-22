import { applyDecorators, CanActivate, Type, UseGuards } from '@nestjs/common';
import { FirstSuccessGuard } from '../guards/first-success.guard';

export function AnyGuard(...guards: Type<CanActivate>[]) {
    return applyDecorators(UseGuards(FirstSuccessGuard(...guards)));
}
