import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AnyGuard } from '../lib/index.js';
import { Guard1, Guard2 } from './guard.js';

@Controller()
export class AppController {
    @Get()
    @AnyGuard(Guard1, Guard2)
    @HttpCode(HttpStatus.OK)
    getSingle(): { name: string } {
        return { name: 'test' };
    }
}
