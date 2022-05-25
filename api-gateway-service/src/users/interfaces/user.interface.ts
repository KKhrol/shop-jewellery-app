import { Role } from '@prisma/client';

export interface User {
  userId: string;
  username: string;
  email: string;
  userRole: Role;
  createdAt: Date;
  updatedAt: Date;
}
