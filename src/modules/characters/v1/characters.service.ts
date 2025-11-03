import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { CharacterMapper } from './mappers';
import { Utils } from '../../../utils';

@Injectable()
export class CharactersService {

  private readonly _include = {
    character_skills: {
      include: {
        skill: true,
      },
    },
    character_relateds: {
      include: {
        related: true,
      },
    },
    relateds_character: {
      include: {
        character: true,
      },
    },
  };

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(host: string, page: number, limit: number) {
    const prismaQuery = {
      skip: undefined,
      take: undefined,
      include: this._include,
    };

    prismaQuery.skip = page ? (page - 1) * limit : undefined;
    prismaQuery.take = limit || undefined;

    const [characters, total] = await this.prisma.$transaction([
      this.prisma.characters.findMany(prismaQuery),
      this.prisma.skills.count({
        where: {
          skill_id: null,
        },
      }),
    ]);

    const _characters = characters.map((character) => {
      return {
        ...character,
        relations: [...character.character_relateds, ...character.relateds_character],
      }
    });

    return {
      info: {
        total,
        limit,
        page: Utils.getPageConfig(page, limit, total),
      },
      data: CharacterMapper.mapList(_characters, host),
    };
  }

  public async findOne(id: string, host: string) {
    const character = await this.prisma.characters.findUnique({
      where: { id },
      include: this._include,
    });

    const mappedCharacter = {
      ...character,
      relations: [...character.character_relateds, ...character.relateds_character],
    };

    return {
      data: CharacterMapper.map(mappedCharacter, host),
    }
  }
}
