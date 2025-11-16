import { Skill } from '../entities';

const map = (skill: any, host: string): Skill => {
  if (!skill) {
    return null;
  }

  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    imageUrl: skill.image_url,
    sourceUrl: skill?.source_url,
    url: `${host}/skills/${skill.id}`,
    type: skill?.type?.description ?? null,
    subSkills: skill?.skills ? mapList(skill.skills, host) : [],
  };
};

const mapList = (skills: any, host: string): Skill[] => {
  return skills.map((skill) => map(skill, host));
};

export const SkillsMapper = {
  map,
  mapList,
};
