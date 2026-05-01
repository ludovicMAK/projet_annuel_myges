import { Response } from "express";
import { ApplicationError } from "@application/errors";

export function mapErrorToHttpResponse(response: Response, error: unknown): Response {
  if (error instanceof ApplicationError) {
    const payload = error.toPayload();
    
    // Map error codes to HTTP status codes
    const statusCodeMap: Record<string, number> = {
      VALIDATION_ERROR: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      APPLICATION_ERROR: 422,
      INFRASTRUCTURE_ERROR: 500,
    };
    
    const statusCode = statusCodeMap[error.code] || 500;
    return response.status(statusCode).json(payload);
  }

  // Default error response for unknown errors
  return response.status(500).json({
    ok: false,
    code: "INFRASTRUCTURE_ERROR",
    message: "Internal server error",
  });
}
