import { ApiResponse, IssueDTO, VolumeDTO, ProductDTO } from './api-types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T | null> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        signal: controller.signal,
        next: { revalidate: 10 }, // Next.js ISR revalidation
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        return null;
      }

      const body: ApiResponse<T> = await res.json();
      if (!body || !body.success) {
        return null;
      }

      return body.data;
    } catch {
      // Return null on network error, connection refused, or timeout
      return null;
    }
  }

  // Issues
  async getIssues(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.fetch<IssueDTO[]>(`/issues${params}`);
  }

  async getIssue(id: string) {
    return this.fetch<IssueDTO>(`/issues/${id}`);
  }

  // Volumes
  async getVolumes(issueId?: string) {
    const params = issueId ? `?issueId=${issueId}` : '';
    return this.fetch<VolumeDTO[]>(`/volumes${params}`);
  }

  // Products
  async getProducts(params?: { issueId?: string; volumeId?: string; category?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.issueId) searchParams.set('issueId', params.issueId);
    if (params?.volumeId) searchParams.set('volumeId', params.volumeId);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    const qs = searchParams.toString();
    return this.fetch<ProductDTO[]>(`/products${qs ? `?${qs}` : ''}`);
  }

  async getProduct(slug: string) {
    return this.fetch<ProductDTO>(`/products/${slug}`);
  }

  // Checkout
  async checkout(data: {
    customerName: string;
    email: string;
    phone: string;
    address: { street: string; city: string; state: string; postalCode: string; country: string };
    items: { productId: string; name: string; size: string; quantity: number; price: number }[];
  }) {
    return this.fetch<{
      orderId: string;
      orderNumber: string;
      razorpayOrderId: string;
      amount: number;
      currency: string;
      key: string;
    }>('/orders/checkout', { method: 'POST', body: JSON.stringify(data) });
  }
}

export const api = new ApiClient(API_BASE);
