import { PrismaClient } from '@prisma/client';

const data = [
  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 4.1,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 4.2,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 3.7,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 2.1,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 4.7,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 3.6,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 2.1,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '0819515d-9f0a-4462-8fe2-67c493465263',
    mark: 5.0,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 2.9,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 3.97,
  },
  {
    userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 4.15,
  },
  {
    userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 4.24,
  },
  {
    userId: 'e8351360-26d3-4580-9197-69a952ceae86',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 4.56,
  },
  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '149b40b3-b3ad-4b6d-b667-718324c2990d',
    mark: 3.3,
  },
  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '17c2ed57-4d74-45c3-b317-8cad88655379',
    mark: 1.95,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '17c2ed57-4d74-45c3-b317-8cad88655379',
    mark: 1.2,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '17c2ed57-4d74-45c3-b317-8cad88655379',
    mark: 2.34,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '17c2ed57-4d74-45c3-b317-8cad88655379',
    mark: 4.89,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 3.95,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 3.78,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 2.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 2.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 4.34,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 4.99,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 3.45,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 2.12,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 4.45,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '524e8b96-c55e-4dd6-9105-7515b4908625',
    mark: 1.25,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 3.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 3.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 3.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 1.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 4.34,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 2.99,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 4.45,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 3.12,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 2.45,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '6bd127eb-683e-4ac6-bd56-a4c73d18a44e',
    mark: 2.25,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 3.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 3.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 3.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 2.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 4.67,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 2.99,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 4.15,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 1.12,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 3.47,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '74586e1a-2d8f-4915-9a07-9584d56a40cd',
    mark: 4.19,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 2.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 4.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 3.17,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 1.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 4.67,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 3.99,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 3.15,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 2.11,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 3.37,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '78ebc973-7eb3-4f9e-ac95-5c26ca4b5361',
    mark: 4.29,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 2.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 4.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 3.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 1.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 4.67,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 3.69,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 3.75,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 2.11,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 3.37,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: '7b3a3616-67ba-49c3-a65d-8cc839f0c5c8',
    mark: 4.29,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 3.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 2.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.67,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 3.59,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 3.15,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 2.81,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.37,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.29,
  },
  {
    userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.37,
  },
  {
    userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
    itemId: 'ace666b1-7536-48bf-817f-56d26e543b8b',
    mark: 4.29,
  },

  {
    userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 4.99,
  },
  {
    userId: '3db2a9f6-4770-4b52-aa5e-13593d771e51',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 4.88,
  },
  {
    userId: '532a7098-8aa4-47ee-bea8-c4b4a393efe1',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 3.67,
  },
  {
    userId: '5c8b775b-a6c8-4a23-87cf-1d0bb5e322d5',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 2.98,
  },
  {
    userId: '88ac343a-3ceb-4ebf-934a-7a935aec5470',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 4.67,
  },
  {
    userId: '94ea164e-bdae-4a43-b10f-06fbd2681711',
    itemId: 'ae437933-bd39-431c-8ba9-9b9f271cec9c',
    mark: 3.59,
  },
  {
    userId: '9870bfad-6e37-43ff-94cf-73a98e83cd8c',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 3.15,
  },
  {
    userId: 'a6d1a0ce-7778-4df4-bff5-4784323b7aa4',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 2.81,
  },
  {
    userId: 'cbb7f8f7-95c3-46e0-b68b-3a6b86379be6',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 4.37,
  },
  {
    userId: 'cb80cf61-9b32-412d-a111-8f7a9b80f9ae',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 4.29,
  },
  {
    userId: 'cd17723c-85a8-42a6-987a-7b532404d521',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 4.37,
  },
  {
    userId: 'cf215ad5-a9ce-4aa2-abda-e77dc2f31135',
    itemId: 'cbad2f31-556a-4a27-9cb5-9cb4970bcdea',
    mark: 4.29,
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.review.createMany({ data });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
