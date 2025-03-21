import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BotUpdate],
})
export class BotModule {}
