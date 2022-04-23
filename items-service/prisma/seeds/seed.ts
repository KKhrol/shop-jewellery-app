import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.item.create({
    data: {
      price: 450,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),

      metal: {
        connectOrCreate: {
          where: {
            name: 'gold',
          },
          create: {
            name: 'gold',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },

      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Miranda Bold Hoops',
          },
          create: {
            name: 'Miranda Bold Hoops',
            description: faker.lorem.sentences(),
            collectionId: '2133b79d-4a75-4661-9919-ddc81a0f96f9',
          },
        },
      },

      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
    include: { jewellery: true, metal: true, image: true },
  });

  await prisma.item.create({
    data: {
      price: 660,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Miranda Bold Hoops',
          },
          create: {
            name: 'Miranda Bold Hoops',
            description: faker.lorem.sentences(),
            collectionId: '2133b79d-4a75-4661-9919-ddc81a0f96f9',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'silver',
          },
          create: {
            name: 'silver',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
    include: { jewellery: true, metal: true, image: true },
  });
  await prisma.item.create({
    data: {
      price: 760,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Miranda Pendant Necklace',
          },
          create: {
            name: 'Miranda Pendant Necklace',
            description: faker.lorem.sentences(),
            collectionId: '2133b79d-4a75-4661-9919-ddc81a0f96f9',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'gold',
          },
          create: {
            name: 'gold',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
    include: { jewellery: true, metal: true, image: true },
  });
  await prisma.item.create({
    data: {
      price: 400,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Miranda Pendant Necklace',
          },
          create: {
            name: 'Miranda Pendant Necklace',
            description: faker.lorem.sentences(),
            collectionId: '2133b79d-4a75-4661-9919-ddc81a0f96f9',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'silver',
          },
          create: {
            name: 'silver',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 560,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Necklace',
          },
          create: {
            name: 'Amanda Lve Necklace',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'silver',
          },
          create: {
            name: 'silver',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 370,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Necklace',
          },
          create: {
            name: 'Amanda Lve Necklace',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'gold',
          },
          create: {
            name: 'gold',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 237,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Necklace',
          },
          create: {
            name: 'Amanda Lve Necklace',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'platinum',
          },
          create: {
            name: 'platinum',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 123,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Earrings',
          },
          create: {
            name: 'Amanda Lve Earrings',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'gold',
          },
          create: {
            name: 'gold',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 456,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Earrings',
          },
          create: {
            name: 'Amanda Lve Earrings',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'silver',
          },
          create: {
            name: 'silver',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 230,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Ring',
          },
          create: {
            name: 'Amanda Lve Ring',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'gold',
          },
          create: {
            name: 'gold',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
      },
    },
  });

  await prisma.item.create({
    data: {
      price: 420,
      description: faker.lorem.sentences(),
      delivery: faker.lorem.sentences(),
      jewellery: {
        connectOrCreate: {
          where: {
            name: 'Amanda Lve Ring',
          },
          create: {
            name: 'Amanda Lve Ring',
            description: faker.lorem.sentences(),
            collectionId: '00402d4b-c0fe-4212-87ee-13416dcda2e5',
          },
        },
      },
      metal: {
        connectOrCreate: {
          where: {
            name: 'silver',
          },
          create: {
            name: 'silver',
            care: faker.lorem.sentences(),
            image: faker.image.imageUrl(),
          },
        },
      },
      image: {
        create: Array.from({ length: 3 }).map(() => ({
          imageURL: faker.image.imageUrl(),
        })),
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
