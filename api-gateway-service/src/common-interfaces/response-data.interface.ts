export interface ResponseData<T> {
  readonly status: string;
  readonly message: string;
  readonly data: T;
}
