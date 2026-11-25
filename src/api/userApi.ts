import { APIRequestContext } from '@playwright/test';
import { UserData } from '../data/userFactory';
import { ApiResult, MessageResponse, toResult } from './http';

export interface UserDetailResponse {
  responseCode: number;
  user: { id: number; name: string; email: string; first_name: string; last_name: string };
}

export class UserApi {
  constructor(private readonly request: APIRequestContext) {}

  async create(user: UserData): Promise<ApiResult<MessageResponse>> {
    return toResult(await this.request.post('/api/createAccount', { form: { ...user } }));
  }

  async verifyLogin(email?: string, password?: string): Promise<ApiResult<MessageResponse>> {
    const form: Record<string, string> = {};
    if (email !== undefined) form.email = email;
    if (password !== undefined) form.password = password;
    return toResult(await this.request.post('/api/verifyLogin', { form }));
  }

  async delete(email: string, password: string): Promise<ApiResult<MessageResponse>> {
    return toResult(await this.request.delete('/api/deleteAccount', { form: { email, password } }));
  }

  async getByEmail(email: string): Promise<ApiResult<UserDetailResponse>> {
    return toResult(await this.request.get('/api/getUserDetailByEmail', { params: { email } }));
  }
}
