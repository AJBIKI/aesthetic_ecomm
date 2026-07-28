'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Layers, PlusCircle, LogOut, Lock } from 'lucide-react';
import { adminApi } from '@/lib/admin-api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    if (!isLoginPage) {
      const token = localStorage.getItem('tmc_admin_token');
      if (!token) {
        router.push('/admin/login');
      }
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted) return null;
  if (isLoginPage) return <>{children}</>;

  const navItems = [
    { href: '/admin', label: 'Overview', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/products', label: 'Products', icon: Layers },
    { href: '/admin/products/new', label: 'New Product', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[oklch(0.12_0.025_145)] text-[oklch(0.93_0.015_145)] flex flex-col md:flex-row font-body">
      
      {/* Dark Sidebar Nav */}
      <aside className="w-full md:w-64 bg-[oklch(0.09_0.02_145)] border-r border-[oklch(0.25_0.03_145)] p-6 shrink-0 space-y-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[oklch(0.55_0.12_195)] block">
            PUBLICATION CMS
          </span>
          <h1
            className="text-xl font-display text-[oklch(0.93_0.015_145)] tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant), "Cormorant Garamond", Georgia, serif' }}
          >
            The Monsoon Club.
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xs text-xs uppercase tracking-[0.18em] font-mono transition-colors ${
                  isActive
                    ? 'bg-[oklch(0.55_0.12_195)] text-white font-semibold'
                    : 'text-[oklch(0.70_0.02_145)] hover:bg-[oklch(0.18_0.02_145)] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="pt-8 border-t border-[oklch(0.25_0.03_145)] space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-[oklch(0.55_0.12_195)] uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Authenticated</span>
          </div>

          <button
            onClick={() => adminApi.logout()}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xs text-xs font-mono uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
