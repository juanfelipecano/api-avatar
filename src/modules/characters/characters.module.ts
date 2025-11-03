import { Module } from '@nestjs/common';
import { CharactersService } from './v1/characters.service';
import { CharactersController } from './v1/characters.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [ PrismaModule ],
  controllers: [ CharactersController ],
  providers: [ CharactersService ],
})
export class CharactersModule {}
