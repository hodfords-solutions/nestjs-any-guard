import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { Guard1, Guard2 } from './guard.js';

@Module({
    imports: [],
    providers: [Guard1, Guard2],
    controllers: [AppController]
})
export class AppModule {}
