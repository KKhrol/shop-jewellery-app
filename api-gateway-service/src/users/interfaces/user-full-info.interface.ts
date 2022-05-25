import { Role } from '@prisma/client';

export interface UserFullInfo {
  userId: string;
  username: string;
  email: string;
  password: string;
  resetCode: string;
  userRole: Role;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}
