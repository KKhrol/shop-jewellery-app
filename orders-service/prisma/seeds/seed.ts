import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.order.create({
    data: {
      summary: 1130,
      userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
      items: {
        create: [
          {
            quantity: 2,
            item: {
              connectOrCreate: {
                where: {
                  id: '0819515d-9f0a-4462-8fe2-67c493465263',
                },
                create: {
                  id: '0819515d-9f0a-4462-8fe2-67c493465263',
                  image: faker.image.imageUrl(),
                  name: 'Miranda Bold Hoops',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 450,
                },
              },
            },
          },
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '149b40b3-b3ad-4b6d-b667-718324c2990d',
                },
                create: {
                  id: '149b40b3-b3ad-4b6d-b667-718324c2990d',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Ring',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 230,
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      summary: 237,
      userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
      items: {
        create: [
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '17c2ed57-4d74-45c3-b317-8cad88655379',
                },
                create: {
                  id: '17c2ed57-4d74-45c3-b317-8cad88655379',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Necklace',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 237,
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      summary: 1093,
      userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
      items: {
        create: [
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '17c2ed57-4d74-45c3-b317-8cad88655379',
                },
                create: {
                  id: '17c2ed57-4d74-45c3-b317-8cad88655379',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Necklace',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 237,
                },
              },
            },
          },
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
                },
                create: {
                  id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
                  image: faker.image.imageUrl(),
                  name: 'Miranda Pendant Necklace',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 400,
                },
              },
            },
          },
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                },
                create: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Earrings',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 456,
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      summary: 856,
      userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
      items: {
        create: [
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
                },
                create: {
                  id: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
                  image: faker.image.imageUrl(),
                  name: 'Miranda Pendant Necklace',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 400,
                },
              },
            },
          },
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                },
                create: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Earrings',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 456,
                },
              },
            },
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      summary: 579,
      userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
      items: {
        create: [
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
                },
                create: {
                  id: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Earrings',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 123,
                },
              },
            },
          },
          {
            quantity: 1,
            item: {
              connectOrCreate: {
                where: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                },
                create: {
                  id: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
                  image: faker.image.imageUrl(),
                  name: 'Amanda Lve Earrings',
                  description: faker.lorem.sentences(),
                  metalImage: faker.image.imageUrl(),
                  price: 456,
                },
              },
            },
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
