import { CharacterType } from '../../../../constants';

const map = (relation: any): string => {
  return relation.related ? relation.related.name : relation.character.name;
};

const mapList = (relations: any, type: CharacterType): string[] => {
  return relations.filter((relation) => relation.relation_type_id === type)
    .map((relation) => map(relation));
};

export const RelationsMapper = {
  map,
  mapList
};
