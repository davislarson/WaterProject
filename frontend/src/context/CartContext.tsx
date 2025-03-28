import { CartItem } from '../types/CartItem';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.projectId === item.projectId);
      const updatedCart = prevCart.map((cartItem) =>
        cartItem.projectId === item.projectId
          ? { ...cartItem, donationAmount: cartItem.donationAmount + item.donationAmount }
          : cartItem
      );
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (projectId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.projectId !== projectId));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
