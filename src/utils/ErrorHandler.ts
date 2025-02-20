class ApiError {
  success: boolean;
  status: number;
  errorMessage: string;

  constructor(
    success: boolean,
    status: number,
    errorMessage: string = "Request failed"
  ) {
    this.success = success;
    this.status = status;
    this.errorMessage = errorMessage;
  }
}

export { ApiError };
