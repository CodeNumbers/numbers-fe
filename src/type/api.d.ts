type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

interface ApiFailureResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}
