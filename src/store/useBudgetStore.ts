import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BasketItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  aisleLocation?: string;
}

interface BudgetState {
  basket: BasketItem[];
  removedItems: BasketItem[];
  addItem: (product: any) => void;
  removeItem: (id: string) => void;
  reAddItem: (id: string) => void;
  clearRemovedItems: () => void;
  updateQuantity: (id: string, delta: number) => void;
  clearBasket: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
  isListOpen: boolean;
  setIsListOpen: (open: boolean) => void;
  selectedProduct: any | null;
  setSelectedProduct: (product: any | null) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      basket: [],
      removedItems: [],
      isListOpen: false,
      setIsListOpen: (open) => set({ isListOpen: open }),

      addItem: (product) =>
        set((state) => {
          const id = product._id || product.id;
          const existing = state.basket.find((i) => i.id === id);
          if (existing) {
            return {
              basket: state.basket.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            basket: [
              ...state.basket,
              {
                id: id,
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: product.image,
                aisleLocation: product.aisleLocation,
              },
            ],
            // Remove from cache if it was there
            removedItems: state.removedItems.filter((i) => i.id !== id),
          };
        }),

      reAddItem: (id) =>
        set((state) => {
          const item = state.removedItems.find((i) => i.id === id);
          if (!item) return state;
          return {
            basket: [...state.basket, { ...item, quantity: 1 }],
            removedItems: state.removedItems.filter((i) => i.id !== id),
          };
        }),

      clearRemovedItems: () => set({ removedItems: [] }),

      updateQuantity: (id, delta) =>
        set((state) => {
          const newBasket = state.basket.map((i) => 
            i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
          );
          
          const filteredBasket = newBasket.filter((i) => i.quantity > 0);
          
          // If item was removed because quantity hit 0, add to removedItems
          const removed = state.basket.find(i => i.id === id && !filteredBasket.find(newI => newI.id === id));
          
          return {
            basket: filteredBasket,
            removedItems: removed ? [...state.removedItems.filter(i => i.id !== id), removed] : state.removedItems,
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const removed = state.basket.find((i) => i.id === id);
          return {
            basket: state.basket.filter((i) => i.id !== id),
            removedItems: removed ? [...state.removedItems.filter(i => i.id !== id), removed] : state.removedItems,
          };
        }),

      clearBasket: () => set((state) => ({ 
        removedItems: [...state.removedItems, ...state.basket],
        basket: [] 
      })),

      getTotal: () => get().basket.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getTotalItems: () => get().basket.reduce((sum, item) => sum + item.quantity, 0),

      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: 'meat-choice-budget-storage', // localStorage key
      partialize: (state) => ({ 
        basket: state.basket,
        removedItems: state.removedItems,
        isListOpen: state.isListOpen 
      }), // Exclude selectedProduct from persistence
    }
  )
);
