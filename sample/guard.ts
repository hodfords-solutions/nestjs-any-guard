import { CanActivate } from '@nestjs/common';

export class Guard1 implements CanActivate {
    canActivate(): boolean | Promise<boolean> {
        console.log('Guard1 canActivate called');
        return false;
    }
}

export class Guard2 implements CanActivate {
    canActivate(): boolean | Promise<boolean> {
        console.log('Guard2 canActivate called');
        return false;
    }
}
