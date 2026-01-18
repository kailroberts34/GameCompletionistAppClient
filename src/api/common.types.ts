export type ApiErrorResponse = {
  error: string;
  message: string;
  details: string | null;
  path: string;
  timestamp: string;
};

export function commonError(path: string, message?: string): ApiErrorResponse {
  return {
    error: "Unknown error",
    message: message || "An unknown error occurred.",
    details: null,
    path,
    timestamp: new Date().toISOString(),
  };
}