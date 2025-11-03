export class Skill {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sourceUrl?: string;
  url: string;
  type?: string;
  subSkills?: Skill[];
}
