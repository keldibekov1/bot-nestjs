import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { session } from 'telegraf';
import { BotUpdate } from './bot/bot.update';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7897153787:AAEqWoQCiP7z-koNuK7QOSIqNh7caZAXV_w',
      middlewares: [session()],
    }),
    BotModule,
  ],
  controllers: [],
  providers: [BotUpdate, PrismaService],
})
export class AppModule {}
