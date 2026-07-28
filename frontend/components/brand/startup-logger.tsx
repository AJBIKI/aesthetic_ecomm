'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';

export function StartupLogger() {
  useEffect(() => {
    api.healthCheck();
  }, []);

  return null;
}
