import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (plant) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === plant._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === plant._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== plantId));
  };
  
  // NEW: Function to update quantity
  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(plantId); // Remove item if quantity is less than 1
    } else {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item._id === plantId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // NEW: Calculate the total price of the cart
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity, // Add new function to context
    cartTotal,      // Add new total to context
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}