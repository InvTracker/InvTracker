export interface ApiResponse<T = unknown> {
  success: true;
  message?: string;
  data: T;
  meta?: {
    count?: number;
    total?: number;
    page?: number;
    requestId: string;
    timestamp: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  code: string;
  message: string;
  details?: unknown;
  requestId: string;
  timestamp: string;
}

