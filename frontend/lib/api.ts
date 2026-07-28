import { ApiResponse, IssueDTO, VolumeDTO, ProductDTO } from './api-types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1';

function log(...args: unknown[]) {
  console.log('[🌐 API]', ...args);
}

function warn(...args: unknown[]) {
  console.warn('[🌐 API]', ...args);
}

class ApiClient {
  private baseUrl: string;
  private connected: boolean | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /** Call once at app startup to check if backend is reachable */
  async healthCheck(): Promise<boolean> {
    try {
      log(`Attempting to connect to backend at ${this.baseUrl}...`);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/issues`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        this.connected = true;
        log('✅ Backend connected successfully!');
        return true;
      }

      warn(`Backend responded with status ${res.status}`);
      this.connected = false;
      return false;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      warn(`❌ Cannot reach backend: ${msg}`);
      warn('   Falling back to static JSON data.');
      this.connected = false;
      return false;
    }
  }

  isConnected(): boolean | null {
    return this.connected;
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T | null> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const url = `${this.baseUrl}${path}`;
      log(`→ GET ${path}`);

      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        warn(`← ${res.status} ${path}`);
        return null;
      }

      const body: ApiResponse<T> = await res.json();
      if (!body || !body.success) {
        warn(`← API error ${path}`);
        return null;
      }

      log(`← ${res.status} ${path} (success)`);
      return body.data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      warn(`⚠ ${path} — ${msg}`);
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
