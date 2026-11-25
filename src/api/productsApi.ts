import { APIRequestContext } from '@playwright/test';
import { ApiResult, MessageResponse, toResult } from './http';

export interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: { usertype: { usertype: string }; category: string };
}

export interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

export interface BrandsResponse {
  responseCode: number;
  brands: { id: number; brand: string }[];
}

export class ProductsApi {
  constructor(private readonly request: APIRequestContext) {}

  async list(): Promise<ApiResult<ProductsResponse>> {
    return toResult(await this.request.get('/api/productsList'));
  }

  /** Unsupported method on purpose: used for a negative test. */
  async postToList(): Promise<ApiResult<MessageResponse>> {
    return toResult(await this.request.post('/api/productsList'));
  }

  async brands(): Promise<ApiResult<BrandsResponse>> {
    return toResult(await this.request.get('/api/brandsList'));
  }

  async search(term?: string): Promise<ApiResult<ProductsResponse & Partial<MessageResponse>>> {
    const form = term === undefined ? {} : { search_product: term };
    return toResult(await this.request.post('/api/searchProduct', { form }));
  }
}
