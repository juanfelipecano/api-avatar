import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule, PrismaModule, SkillsModule } from './modules';

@Module({
  imports: [CharactersModule, PrismaModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
