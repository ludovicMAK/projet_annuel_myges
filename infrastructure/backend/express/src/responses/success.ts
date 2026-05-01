import { Response } from "express";

export interface SuccessResponse<T = unknown> {
  status?: number;
  code: string;
  message: string;
  data?: T;
}

export function sendSuccess<T = unknown>(
  response: Response,
  payload: SuccessResponse<T>,
): Response {
  const { status = 200, code, message, data } = payload;

  const body: Record<string, unknown> = {
    ok: true,
    code,
    message,
  };

  if (data !== undefined) {
    body.data = data;
  }

  return response.status(status).json(body);
}
