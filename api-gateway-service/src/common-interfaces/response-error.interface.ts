export interface ResponseError {
  readonly status: string;
  readonly message: string;
  readonly error: string;
}

export function isResponseError(object: any): object is ResponseError {
  return 'error' in object;
}
