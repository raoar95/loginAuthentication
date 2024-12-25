class ApiError {
  status: number;
  errorMessage: string;
  data?: any;

  constructor(
    status: number,
    errorMessage: string = "Request failed",
    data?: any
  ) {
    this.status = status;
    this.errorMessage = errorMessage;
    this.data = data;
  }
}

export { ApiError };
