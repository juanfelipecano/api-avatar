import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function initialTypes() {
  const enemyType = await prisma.character_types.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: 'Enemy',
    },
  });

  const allyType = await prisma.character_types.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      description: 'Ally',
    },
  });

  const bendingType = await prisma.skill_types.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: 'Bending',
    },
  });

  const otherType = await prisma.skill_types.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      description: 'Other',
    },
  });

  console.log({
    enemyType,
    allyType,
    bendingType,
    otherType,
  });
}

async function skills() {
  const airbending = await prisma.skills.upsert({
    where: { id: 'b17e42f9-fd9e-44c7-b827-1f8ba240092f' },
    update: {},
    create: {
      id: 'b17e42f9-fd9e-44c7-b827-1f8ba240092f',
      name: 'Airbending',
      description: 'Airbending is the bending art used by the Air Nomads; the flying bison were the original airbenders. It concentrates on speed and evasion, forgoing a strong offense for a greater defense.',
      type_id: 1,
      source_url: 'https://avatar.fandom.com/wiki/Airbending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/3/37/Aang_inhales.png/revision/latest?cb=20130814113013',
    },
  });

  const firebending = await prisma.skills.upsert({
    where: { id: 'ba1654f6-033c-4873-aa29-40c0b58f81c6' },
    update: {},
    create: {
      id: 'ba1654f6-033c-4873-aa29-40c0b58f81c6',
      name: 'Firebending',
      description: 'Firebending is used by the people of the Fire Nation and is the most aggressive bending art. Dragons were the first firebenders; they subsequently taught the Sun Warriors.',
      type_id: 1,
      source_url: 'https://avatar.fandom.com/wiki/Firebending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/0/03/Zuko_firebending.png/revision/latest?cb=20121120115931',
    },
  });

  const waterbending = await prisma.skills.upsert({
    where: { id: '101bc91d-34b4-4e68-89b8-27f00603e276' },
    update: {},
    create: {
      id: '101bc91d-34b4-4e68-89b8-27f00603e276',
      name: 'Waterbending',
      description: 'Waterbending is practiced by some people of the Water Tribe. A versatile element, it is unique in the sense that the original bender of the element was not an animal, but rather the Moon. Similar to their element, waterbenders are extremely adaptable and versatile.',
      type_id: 1,
      source_url: 'https://avatar.fandom.com/wiki/Waterbending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/d/da/Pakku_waterbends.png/revision/latest?cb=20140119164142',
    },
  });

  const earthbending = await prisma.skills.upsert({
    where: { id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea' },
    update: {},
    create: {
      id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      name: 'Earthbending',
      description: 'Earthbending originates in the Earth Kingdom and the first earthbenders were badgermoles. It demands a special connection with the earth that is achievable with neutral jing, listening, though seemingly doing nothing and waiting for the right moment to strike.',
      type_id: 1,
      source_url: 'https://avatar.fandom.com/wiki/Earthbending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/8/8f/Earthbending.png/revision/latest?cb=20130620112648',
    },
  });

  const energybending = await prisma.skills.upsert({
    where: { id: '3d0c110f-bb37-44af-bc15-75e3324ae7e4' },
    update: {},
    create: {
      id: '3d0c110f-bb37-44af-bc15-75e3324ae7e4',
      name: 'Energybending',
      description: '',
      type_id: 1,
      source_url: 'https://avatar.fandom.com/wiki/Energybending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/7/7c/Energybending.png/revision/latest?cb=20130624153421',
    },
  });

  const metalbending = await prisma.skills.upsert({
    where: { id: 'c4f1f8c0-f5b8-4d5f-b1c8-d1b2f4a0f0c2' },
    update: {},
    create: {
      id: 'c4f1f8c0-f5b8-4d5f-b1c8-d1b2f4a0f0c2',
      name: 'Metalbending',
      description: 'Metalbending is a specialized sub-skill of earthbending that allows an earthbender to ferrokinetically bend natural and processed metal in a similar fashion to bending regular earth. Long regarded an impossible feat, the ability was invented by Toph Beifong to escape from a metal cage in which she was captured and transported by Xin Fu and Master Yu.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Metalbending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/5/50/Toph_metalbends.png/revision/latest?cb=20140519095030',
    },
  });

  const glassbending = await prisma.skills.upsert({
    where: { id: 'bfabb6dc-87fd-4bd6-9574-b72963a10085' },
    update: {},
    create: {
      id: 'bfabb6dc-87fd-4bd6-9574-b72963a10085',
      name: 'Glassbending',
      description: 'Some earthbenders are able to control glass due to its mineral origin. Avatar Kyoshi was capable of this technique, such as when she bent shards of glass out of her skin following her confrontation with the Triad of the Golden Wing.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Fanon:Glassbending',
      image_url: '',
    },
  });

  const lavabending = await prisma.skills.upsert({
    where: { id: '1326d26d-cf8b-4e60-8f89-5bb1cb76cc5d' },
    update: {},
    create: {
      id: '1326d26d-cf8b-4e60-8f89-5bb1cb76cc5d',
      name: 'Lavabending',
      description: 'Lavabending is a specialized sub-skill of earthbending that allows the user to manipulate molten earth. This rare ability allows the bender to phase-change earth into lava, lava into earth, and otherwise manipulate existing lava with great dexterity.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Lavabending',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/a/ae/Lavabending_Bolin.png/revision/latest?cb=20141120125311',
    },
  });

  const rockGloves = await prisma.skills.upsert({
    where: { id: 'a4e9820d-f42a-4706-9545-6b02689db9f4' },
    update: {},
    create: {
      id: 'a4e9820d-f42a-4706-9545-6b02689db9f4',
      name: 'Rock gloves',
      description: 'Rock gloves are the favored weapons of Ba Sing Se\'s secret police force, known as the Dai Li. The Dai Li agents all wear gloves, each made from individual stone tiles covering their hands. Via earthbending, they provide long-range attacks, enabling agents to throw stone punches at opponents from across a room.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Rock_gloves',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/6/65/Rock_glove.png/revision/latest?cb=20140517113729',
    },
  });

  const seismicSense = await prisma.skills.upsert({
    where: { id: '93996620-07cf-4fd4-87bc-2bcde49383c0' },
    update: {},
    create: {
      id: '93996620-07cf-4fd4-87bc-2bcde49383c0',
      name: 'Seismic sense',
      description: 'Seismic sense is a sub-skill of earthbending that constitutes for physical sense. This skill enables earthbenders to detect vibrations in the ground to perceive objects, people, and other aspects of their environment, essentially acting as sonar, but through earth and metal.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Seismic_sense',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/c/c6/Toph%27s_vision.png/revision/latest?cb=20140317211615',
    },
  });

  const sandbending = await prisma.skills.upsert({
    where: { id: 'e8cc1ea6-7c60-46a7-bd4c-ce32d0257b3e' },
    update: {},
    create: {
      id: 'e8cc1ea6-7c60-46a7-bd4c-ce32d0257b3e',
      name: 'Sandbending',
      description: 'Sandbending is an alternate earthbending style that has been adapted for use in the Si Wong Desert by the people that live there. They move quickly in the desert on specialized wooden sailers that are propelled by bending miniature, localized sandstorms behind their sails. Because sand is sediment which travels in flows, their style resembles air and waterbending more than earthbending.',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: 'https://avatar.fandom.com/wiki/Earthbending#Special_techniques',
      image_url: 'https://static.wikia.nocookie.net/avatar/images/9/94/Sandbenders_using_a_sand-sailer.png/revision/latest?cb=20140404203810',
    },
  });

  const metaBending = await prisma.skills.upsert({
    where: { id: '' },
    update: {},
    create: {
      id: '',
      name: '',
      description: '',
      type_id: 1,
      skill_id: '4844f47b-c8ec-4b6d-82ef-d4c86379eeea',
      source_url: '',
      image_url: '',
    },
  });

  console.log({
    airbending,
    firebending,
    waterbending,
    earthbending,
    energybending,
    metalbending,
    glassbending,
    lavabending,
    rockGloves,
    seismicSense,
  });
}

async function characters() {
  const aang = await prisma.characters.upsert({
    where: { id: 'a4c505ce-2e19-46fc-9447-f2d9f4f1401d' },
    update: {},
    create: {
      id: 'a4c505ce-2e19-46fc-9447-f2d9f4f1401d',
      name: 'Aang',
      description: 'The last Airbender and Avatar.',
      source_url: 'https://avatar.fandom.com/wiki/Aang',
      image_url: 'https://media.revistagq.com/photos/5f08145242f91a64e56904be/16:9/w_1920,c_limit/avatar_aang.jpg',
    },
  });

  const katara = await prisma.characters.upsert({
    where: { id: '6b22bc26-4732-4a65-8640-48306df2b75d' },
    update: {},
    create: {
      id: '6b22bc26-4732-4a65-8640-48306df2b75d',
      name: 'Katara',
      description: 'A waterbender from the Southern Water Tribe.',
      source_url: 'https://avatar.fandom.com/wiki/Katara',
      image_url: 'https://m.media-amazon.com/images/I/61Agca3bOgL._AC_UF894,1000_QL80_.jpg',
    },
  });

  const zuko = await prisma.characters.upsert({
    where: { id: '2c413457-465f-4135-a288-120582ae62e9' },
    update: {},
    create: {
      id: '2c413457-465f-4135-a288-120582ae62e9',
      name: 'Zuko',
      description: 'The exiled prince of the Fire Nation.',
      source_url: 'https://avatar.fandom.com/wiki/Zuko',
      image_url: 'https://sm.ign.com/t/ign_latam/screenshot/default/zuko_352t.1280.jpg',
    },
  });

  console.log({
    aang,
    katara,
    zuko,
  });
}

async function characterSkills() {
  const aangSkills = await prisma.character_skills.upsert({
    where: { id: 1 },
    update: {},
    create: {
      character_id: 'a4c505ce-2e19-46fc-9447-f2d9f4f1401d',
      skill_id: 'b17e42f9-fd9e-44c7-b827-1f8ba240092f',
    },
  });

  const kataraSkills = await prisma.character_skills.upsert({
    where: { id: 2 },
    update: {},
    create: {
      character_id: '6b22bc26-4732-4a65-8640-48306df2b75d',
      skill_id: '101bc91d-34b4-4e68-89b8-27f00603e276',
    },
  });

  const zukoSkills = await prisma.character_skills.upsert({
    where: { id: 3 },
    update: {},
    create: {
      character_id: '2c413457-465f-4135-a288-120582ae62e9',
      skill_id: 'ba1654f6-033c-4873-aa29-40c0b58f81c6',
    },
  });

  console.log({
    aangSkills,
    kataraSkills,
    zukoSkills,
  });
}

async function characterRelations() {
  const anngRelations = await prisma.character_relations.upsert({
    where: { id: 1 },
    update: {},
    create: {
      character_id: 'a4c505ce-2e19-46fc-9447-f2d9f4f1401d',
      relation_id: '6b22bc26-4732-4a65-8640-48306df2b75d',
      relation_type_id: 2,
    },
  });

  console.log({
    anngRelations,
  });
}

async function main() {
  await initialTypes();
  await skills();
  await characters();
  await characterSkills();
  await characterRelations();
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });