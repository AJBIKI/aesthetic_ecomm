import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from './types';

interface StoreState {
  bag: CartItem[];
  wishlist: string[];
  isBagOpen: boolean;
  isMobileNavOpen: boolean;
  activeVolume: string; // Dynamic margin metadata
  
  // Actions
  addToBag: (product: Product, size: string) => void;
  removeFromBag: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearBag: () => void;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  setBagOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setActiveVolume: (volume: string) => void;
  
  // Computed helpers
  getBagCount: () => number;
  getBagSubtotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      bag: [],
      wishlist: [],
      isBagOpen: false,
      isMobileNavOpen: false,
      activeVolume: 'VOL. I // 30-MOMME SILKS',

      addToBag: (product, size) => {
        set((state) => {
          const existingIndex = state.bag.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === size
          );

          if (existingIndex > -1) {
            const updated = [...state.bag];
            updated[existingIndex].quantity += 1;
            return { bag: updated, isBagOpen: true };
          }

          return {
            bag: [...state.bag, { product, selectedSize: size, quantity: 1 }],
            isBagOpen: true,
          };
        });
      },

      removeFromBag: (productId, size) => {
        set((state) => ({
          bag: state.bag.filter(
            (item) => !(item.product.id === productId && item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (productId, size, delta) => {
        set((state) => {
          const updated = state.bag
            .map((item) => {
              if (item.product.id === productId && item.selectedSize === size) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[];

          return { bag: updated };
        });
      },

      clearBag: () => set({ bag: [] }),

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.wishlist.includes(productId);
          return {
            wishlist: exists
              ? state.wishlist.filter((id) => id !== productId)
              : [...state.wishlist, productId],
          };
        });
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      setBagOpen: (open) => set({ isBagOpen: open }),
      setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
      setActiveVolume: (volume) => set({ activeVolume: volume }),

      getBagCount: () => get().bag.reduce((sum, item) => sum + item.quantity, 0),
      getBagSubtotal: () =>
        get().bag.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'the-monsoon-club-storage',
      partialize: (state) => ({ bag: state.bag, wishlist: state.wishlist }),
    }
  )
);
