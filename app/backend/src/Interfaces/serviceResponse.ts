export type ServiceMessage = { message: string };

export type password = string;

type ServiceResponseErrorType = 401 | 400 | 404;

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage,
};

export type ServiceResponseSuccess<T> = {
  status: 200 | 201,
  data: T,
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
