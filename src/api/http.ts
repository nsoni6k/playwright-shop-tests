import { APIResponse } from '@playwright/test';

export interface ApiResult<T> {
  httpStatus: number;
  body: T;
}

/**
 * automationexercise.com returns HTTP 200 for almost everything, puts the "real" status in
 * body.responseCode, and sends JSON with a text/html content type. So we parse the text ourselves.
 */
export async function toResult<T>(res: APIResponse): Promise<ApiResult<T>> {
  const text = await res.text();
  return { httpStatus: res.status(), body: JSON.parse(text) as T };
}

export interface MessageResponse {
  responseCode: number;
  message: string;
}
