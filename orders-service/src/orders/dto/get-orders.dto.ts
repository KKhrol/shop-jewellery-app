export class GetOrdersDto {
  userId: string;
  page: number;
  ordersPerPage: number;
  deleted: boolean;
}
