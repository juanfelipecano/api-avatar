import { CharacterType, SkillType } from '../../../../constants';
import { SkillsMapper } from '../../../skills/v1/mappers';
import { Character } from '../entities/character.entity';
import { RelationsMapper } from './relations.mapper';

const map = (character: any, host: string): Character => {
  const bendingSkills = character.character_skills
    .filter((item) => item.skill.type_id === SkillType.BENDING)
    .map((item) => item.skill);

  const otherSkills = character.character_skills
    .filter((item) => item.skill.type_id === SkillType.OTHER)
    .map((item) => item.skill);

  return {
    id: character.id,
    name: character.name,
    description: character.description,
    imageUrl: character.image_url,
    sourceUrl: character.source_url,
    url: `${ host }/characters/${ character.id }`,
    skills: {
      bending: SkillsMapper.mapList(bendingSkills, host),
      other: SkillsMapper.mapList(otherSkills, host),
    },
    allies: RelationsMapper.mapList(character.relations, CharacterType.ALLY),
    enemies: RelationsMapper.mapList(character.relations, CharacterType.ENEMY),
  };
}

const mapList = (characters: any, host: string): Character[] => {
  return characters.map((character) => map(character, host));
}

export const CharacterMapper = {
  map,
  mapList
};
