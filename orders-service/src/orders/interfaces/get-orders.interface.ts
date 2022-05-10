export interface GetOrdersDto {
  userId: string;
  page: number;
  ordersPerPage: number;
  deleted: boolean;
}
