import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Adicionar itens ao carrinho
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantidade: cartItem.quantidade + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantidade: 1 }];
      }
    });
  };

  // Atualizar quantidade de itens
  const updateQuantity = (id, quantidade) => {
    setCart((prevCart) =>
      quantidade > 0
        ? prevCart.map((item) =>
            item.id === id ? { ...item, quantidade } : item
          )
        : prevCart.filter((item) => item.id !== id) // Remove item se quantidade for 0
    );
  };

  // Limpar carrinho
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
