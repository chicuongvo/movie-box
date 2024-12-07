import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartContextType {
  discount: number;
  setDiscount: (discount: number) => void;
  appliedCoupon: string | null;
  setAppliedCoupon: (coupon: string | null) => void;
  total: number;
  setTotal: (total: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const savedDiscount = localStorage.getItem("discount");
  const savedAppliedCoupon = localStorage.getItem("appliedCoupon");
  const savedTotal = localStorage.getItem("total");

  const [discount, setDiscount] = useState<number>(
    savedDiscount ? parseFloat(savedDiscount) : 0
  );
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(
    savedAppliedCoupon
  );
  const [total, setTotal] = useState<number>(
    savedTotal ? parseFloat(savedTotal) : 0
  );

  useEffect(() => {
    localStorage.setItem("discount", discount.toString());
  }, [discount]);

  useEffect(() => {
    if (appliedCoupon !== null) {
      localStorage.setItem("appliedCoupon", appliedCoupon);
    } else {
      localStorage.removeItem("appliedCoupon");
    }
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem("total", total.toString());
  }, [total]);

  return (
    <CartContext.Provider
      value={{
        discount,
        setDiscount,
        appliedCoupon,
        setAppliedCoupon,
        total,
        setTotal,
      }}
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
