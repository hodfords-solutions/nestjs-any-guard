import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Guard1, Guard2 } from './guard';

@Module({
    imports: [],
    providers: [
        Guard1,
        Guard2
    ],
    controllers: [AppController]
})
export class AppModule {}
