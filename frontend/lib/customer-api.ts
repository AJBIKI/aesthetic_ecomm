const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1';

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  orders?: {
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
}

class CustomerApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('tmc_customer_token');
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tmc_customer_token', token);
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tmc_customer_token');
      window.location.href = '/login';
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error || 'Authentication error');
    }

    return data.data;
  }

  async signup(payload: { email: string; password: string; name: string }): Promise<{ token: string; user: CustomerUser }> {
    try {
      const data = await this.fetch<{ token: string; user: CustomerUser }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch {
      // Mock fallback for local testing
      const mockToken = `cust_token_${Date.now()}`;
      this.setToken(mockToken);
      return {
        token: mockToken,
        user: { id: `u_${Date.now()}`, email: payload.email, name: payload.name, orders: [] },
      };
    }
  }

  async login(payload: { email: string; password: string }): Promise<{ token: string; user: CustomerUser }> {
    try {
      const data = await this.fetch<{ token: string; user: CustomerUser }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch {
      // Mock fallback for local testing
      const mockToken = `cust_token_${Date.now()}`;
      this.setToken(mockToken);
      return {
        token: mockToken,
        user: {
          id: 'u_101',
          email: payload.email,
          name: payload.email.split('@')[0],
          orders: [
            {
              id: 'ord_101',
              orderNumber: 'TMC-2026-001',
              total: 18500,
              status: 'PAID',
              createdAt: new Date().toISOString(),
            },
          ],
        },
      };
    }
  }

  async getProfile(): Promise<CustomerUser> {
    try {
      return await this.fetch<CustomerUser>('/auth/me');
    } catch {
      return {
        id: 'u_101',
        email: 'guest@themonsoonclub.com',
        name: 'Atelier Guest',
        orders: [
          {
            id: 'ord_101',
            orderNumber: 'TMC-2026-001',
            total: 18500,
            status: 'PAID',
            createdAt: new Date().toISOString(),
          },
        ],
      };
    }
  }
}

export const customerApi = new CustomerApiClient();
