import React from "react";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <tr>
      <td>
        <button onClick={() => onRemove(item.id)}>🗑️</button>
      </td>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
