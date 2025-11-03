import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SkillsMapper } from './mappers';
import { Utils } from '../../../utils';

@Injectable()
export class SkillsService {

  constructor(private readonly prisma: PrismaService) {}

  public async findAll(host: string, page?: number, limit?: number) {
    const prismaQuery = {
      skip: undefined,
      take: undefined,
      where: {
        skill_id: null,
      },
      include: {
        type: true,
        skills: true,
      },
    };

    prismaQuery.skip = page ? (page - 1) * limit : undefined;
    prismaQuery.take = limit || undefined;

    const [skills, total] = await this.prisma.$transaction([
      this.prisma.skills.findMany(prismaQuery),
      this.prisma.skills.count({
        where: {
          skill_id: null,
        },
      }),
    ]);

    return {
      info: {
        total,
        limit,
        page: Utils.getPageConfig(page, limit, total),
      },
      data: SkillsMapper.mapList(skills, host),
    };
  }

  public async findOne(id: string, host: string) {
    const skill = await this.prisma.skills.findUnique({
      where: { id },
      include: {
        type: true,
        skills: true,
      },
    });

    return {
      data: SkillsMapper.map(skill, host),
    };
  }
}
