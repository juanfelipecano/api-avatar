import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SkillsController, SkillsService } from './v1';

@Module({
  imports: [ PrismaModule ],
  controllers: [ SkillsController ],
  providers: [ SkillsService ],
})
export class SkillsModule {}
