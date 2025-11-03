import { Skill } from '../../../skills/v1/entities';

export class Character {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
  url: string;
  skills?: SkillTypes;
  allies?: string[];
  enemies?: string[];
}

export class SkillTypes {
  bending?: CharacterSkill[];
  other?: CharacterSkill[];
}

export type CharacterSkill = Omit<Skill, 'subSkills' | 'type'>;
