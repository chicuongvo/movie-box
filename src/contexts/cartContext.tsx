// cartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  discount: number;
  setDiscount: (discount: number) => void;
  appliedCoupon: string | null;
  setAppliedCoupon: (coupon: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  return (
    <CartContext.Provider
      value={{ discount, setDiscount, appliedCoupon, setAppliedCoupon }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
