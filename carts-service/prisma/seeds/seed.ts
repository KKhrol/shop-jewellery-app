import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.create({
    data: {
      id: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
      image: faker.image.imageUrl(),
      itemName: 'Amanda Lve Earrings',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 123,

      Cart: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            quantity: 2,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 1,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            quantity: 1,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            quantity: 1,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 1,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 3,
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      id: '0819515d-9f0a-4462-8fe2-67c493465263',
      image: faker.image.imageUrl(),
      itemName: 'Miranda Bold Hoops',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 450,

      Cart: {
        create: [
          {
            userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
            quantity: 1,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 1,
          },
          {
            userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
            quantity: 1,
          },
          {
            userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
            quantity: 2,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 1,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      id: '149b40b3-b3ad-4b6d-b667-718324c2990d',
      image: faker.image.imageUrl(),
      itemName: 'Amanda Lve Ring',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 230,

      Cart: {
        create: [
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            quantity: 2,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 1,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            quantity: 1,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            quantity: 2,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 1,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 1,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            quantity: 1,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            quantity: 2,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      id: '17c2ed57-4d74-45c3-b317-8cad88655379',
      image: faker.image.imageUrl(),
      itemName: 'Amanda Lve Necklace',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 237,

      Cart: {
        create: [
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            quantity: 2,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 2,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            quantity: 1,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            quantity: 2,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 3,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 1,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            quantity: 2,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            quantity: 2,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
      image: faker.image.imageUrl(),
      itemName: 'Miranda Pendant Necklace',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 400,

      Cart: {
        create: [
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            quantity: 1,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 1,
          },
          {
            userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
            quantity: 2,
          },
          {
            userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
            quantity: 1,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 1,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 1,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            quantity: 1,
          },
          {
            userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
            quantity: 1,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            quantity: 1,
          },
        ],
      },
    },
  });

  await prisma.item.create({
    data: {
      id: 'ace666b1-7536-48bf-817f-56d26e543b8b',
      image: faker.image.imageUrl(),
      itemName: 'Miranda Bold Hoops',
      description: faker.lorem.sentences(),
      metalImage: faker.image.imageUrl(),
      price: 660,

      Cart: {
        create: [
          {
            userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
            quantity: 1,
          },
          {
            userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
            quantity: 1,
          },
          {
            userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
            quantity: 1,
          },
          {
            userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
            quantity: 1,
          },
          {
            userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
            quantity: 1,
          },
          {
            userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
            quantity: 1,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
