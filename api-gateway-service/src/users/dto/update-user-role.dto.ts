import { Role } from '@prisma/client';
import { IsDefined, IsIn } from 'class-validator';

export class UpdateUserRoleDto {
  @IsDefined()
  @IsIn([Role.USER, Role.ADMIN])
  userRole: Role;
}
