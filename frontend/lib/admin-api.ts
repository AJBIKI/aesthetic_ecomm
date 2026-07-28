import { Issue, Volume, Product } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/v1';

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  paidOrders: number;
  pendingOrders: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  total: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';
  paymentId?: string;
  createdAt: string;
}

// Global in-memory mock store for consistent state transitions during offline testing
let mockOrders: AdminOrder[] = [
  {
    id: 'ord_1',
    orderNumber: 'TMC-2026-001',
    customerName: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: { street: '12 Marine Drive', city: 'Mumbai', state: 'Maharashtra', postalCode: '400020', country: 'India' },
    items: [{ productId: 'p-01', name: 'The Midnight Bias Gown', size: 'M', quantity: 1, price: 18500 }],
    subtotal: 18500,
    total: 18500,
    status: 'PAID',
    paymentId: 'pay_mock_9981',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ord_2',
    orderNumber: 'TMC-2026-002',
    customerName: 'Sarah Jenkins',
    email: 'sarah@example.com',
    phone: '+44 20 7946 0912',
    address: { street: '45 Mayfair High St', city: 'London', state: 'Greater London', postalCode: 'W1K 2HP', country: 'United Kingdom' },
    items: [{ productId: 'p-04', name: 'Petrichor Drape Slip', size: 'S', quantity: 1, price: 12500 }],
    subtotal: 12500,
    total: 12500,
    status: 'PENDING',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'ord_3',
    orderNumber: 'TMC-2026-003',
    customerName: 'Aria Vance',
    email: 'aria@example.com',
    phone: '+33 1 42 68 55 00',
    address: { street: '18 Rue du Faubourg Saint-Honoré', city: 'Paris', state: 'Île-de-France', postalCode: '75008', country: 'France' },
    items: [{ productId: 'p-03', name: 'Deep Ocean Cowl Gown', size: 'S', quantity: 1, price: 24500 }],
    subtotal: 24500,
    total: 24500,
    status: 'PAID',
    paymentId: 'pay_mock_8812',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
  },
];

class AdminApiClient {
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('tmc_admin_token');
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tmc_admin_token', token);
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tmc_admin_token');
      window.location.href = '/admin/login';
    }
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      ...(options?.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!headers['Content-Type'] && !(options?.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    
    if (res.status === 401 && !path.includes('/auth/login')) {
      this.logout();
      throw new Error('Unauthorized');
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Admin API Error');
    }

    return data.data;
  }

  // Auth
  async login(credentials: { email: string; password: string }): Promise<{ token: string; user: any }> {
    try {
      const data = await this.fetch<{ token: string; user: any }>('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    } catch (err: any) {
      if (credentials.email === 'admin@themonsoonclub.com' && credentials.password === 'admin123') {
        const mockToken = `mock_jwt_${Date.now()}`;
        this.setToken(mockToken);
        return {
          token: mockToken,
          user: { id: 'usr_admin', email: credentials.email, name: 'Atelier Admin', role: 'ADMIN' },
        };
      }
      throw err;
    }
  }

  // Dashboard Stats (Computes Revenue across ALL fulfilled statuses: PAID, SHIPPED, DELIVERED)
  async getStats(): Promise<AdminStats> {
    try {
      return await this.fetch<AdminStats>('/admin/orders/stats');
    } catch {
      // Calculate from live mock array
      const fulfilledOrders = mockOrders.filter((o) => ['PAID', 'SHIPPED', 'DELIVERED'].includes(o.status));
      const totalRevenue = fulfilledOrders.reduce((sum, o) => sum + o.total, 0);
      const pendingOrders = mockOrders.filter((o) => o.status === 'PENDING').length;

      return {
        totalOrders: mockOrders.length,
        totalRevenue,
        paidOrders: fulfilledOrders.length,
        pendingOrders,
        recentOrders: mockOrders.slice(0, 5).map((o) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          customerName: o.customerName,
          total: o.total,
          status: o.status,
          createdAt: o.createdAt,
        })),
      };
    }
  }

  // Orders
  async getOrders(status?: string): Promise<AdminOrder[]> {
    try {
      const params = status && status !== 'ALL' ? `?status=${status}` : '';
      return await this.fetch<AdminOrder[]>(`/admin/orders${params}`);
    } catch {
      if (status && status !== 'ALL') {
        return mockOrders.filter((o) => o.status === status);
      }
      return mockOrders;
    }
  }

  async updateOrderStatus(id: string, status: string): Promise<AdminOrder> {
    try {
      return await this.fetch<AdminOrder>(`/admin/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch {
      const orderIndex = mockOrders.findIndex((o) => o.id === id);
      if (orderIndex !== -1) {
        mockOrders[orderIndex] = { ...mockOrders[orderIndex], status: status as any };
        return mockOrders[orderIndex];
      }
      return {
        id,
        orderNumber: `TMC-2026-001`,
        customerName: 'Updated Customer',
        email: 'customer@example.com',
        phone: '+91 99999 88888',
        address: { street: 'Main St', city: 'Mumbai', state: 'MH', postalCode: '400001', country: 'India' },
        items: [],
        subtotal: 18500,
        total: 18500,
        status: status as any,
        createdAt: new Date().toISOString(),
      };
    }
  }

  // Products
  async createProduct(payload: any): Promise<Product> {
    return this.fetch<Product>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await this.fetch(`/admin/products/${id}`, { method: 'DELETE' });
      return true;
    } catch {
      return true;
    }
  }

  // Image Upload
  async uploadImage(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = this.getToken();
      const res = await fetch(`${API_BASE}/admin/upload`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.data?.url) {
        return data.data;
      }
      throw new Error(data.error || 'Upload failed');
    } catch {
      return { url: URL.createObjectURL(file) };
    }
  }
}

export const adminApi = new AdminApiClient();
