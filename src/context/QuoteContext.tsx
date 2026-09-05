import React, { createContext, useContext, useState, useEffect } from 'react';
import type { QuoteItem } from '../types';

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string, capacity: string) => void;
  updateQuantity: (productId: string, capacity: string, quantity: number) => void;
  toggleCustomBranding: (productId: string, capacity: string) => void;
  clearBasket: () => void;
  totalItemsCount: number;
  lastAddedItem: string | null;
  resetNotification: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

const STORAGE_KEY = 'ab_traders_quote_basket_v1';

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse quote basket from localStorage', e);
    }
    return [];
  });

  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to persist quote basket to localStorage', e);
    }
  }, [items]);

  const addItem = (newItem: Omit<QuoteItem, 'quantity'>, quantity = 500) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === newItem.productId && i.capacity === newItem.capacity
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          customBranding: newItem.customBranding || updated[existingIndex].customBranding,
        };
        return updated;
      }

      return [...prev, { ...newItem, quantity }];
    });

    setLastAddedItem(newItem.productName);
    setTimeout(() => {
      setLastAddedItem(null);
    }, 4000);
  };

  const removeItem = (productId: string, capacity: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.capacity === capacity)));
  };

  const updateQuantity = (productId: string, capacity: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, capacity);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.capacity === capacity ? { ...i, quantity } : i
      )
    );
  };

  const toggleCustomBranding = (productId: string, capacity: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.capacity === capacity
          ? { ...i, customBranding: !i.customBranding }
          : i
      )
    );
  };

  const clearBasket = () => {
    setItems([]);
  };

  const resetNotification = () => setLastAddedItem(null);

  const totalItemsCount = items.length;

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        toggleCustomBranding,
        clearBasket,
        totalItemsCount,
        lastAddedItem,
        resetNotification,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
