import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state for the shopping cart
const initialState = {
  cart: [],
  items: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      img: "https://i.dummyjson.com/data/products/1/1.jpg",
      quantity: 1,
    },
    {
      id: 2,
      title: "iPhone X",
      description: "Model A19211 Super Retina HD display 2017",
      price: 899,
      img: "https://i.dummyjson.com/data/products/2/1.jpg",
      quantity: 1,
    },
    {
      id: 3,
      title: "Samsung 9",
      description: "Samsung's new variant Galaxy to the Universe",
      price: 1249,
      img: "https://i.dummyjson.com/data/products/3/1.jpg",
      quantity: 1,
    },
    {
      id: 4,
      title: "OPPO F19",
      description: "OPPO F19 is announced on April 2021.",
      price: 280,
      img: "https://i.dummyjson.com/data/products/4/1.jpg",
      quantity: 1,
    },
    {
      id: 5,
      title: "Huawei P30",
      description: "Huawei’s P30 Pro New Edition way to the UK.",
      price: 499,
      img: "https://i.dummyjson.com/data/products/5/1.jpg",
      quantity: 1,
    }
  ],
  totalQuantity: 0,
  totalPrice: 0,
};

// Context for the shopping cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// Cart reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { cart } = state;
      const { payload: newItem } = action;

      const itemInCart = cart.find((item) => item.id === newItem.id);

      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        const newItemWithQuantity = { ...newItem, quantity: 1 };
        cart.push(newItemWithQuantity);
      }

      const addedItem = cart.find((item) => item.id === newItem.id);
      const totalQuantityAfterAdd = state.totalQuantity + 1;
      const totalPriceAfterAdd = state.totalPrice + addedItem.price;

      return {
        ...state,
        cart,
        totalQuantity: totalQuantityAfterAdd,
        totalPrice: totalPriceAfterAdd,
      };

    case 'GET_CART_TOTAL':
      const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = state.cart.reduce((total, item) => total + item.quantity * item.price, 0);

      return { ...state, totalQuantity, totalPrice };

    case 'REMOVE_ITEM':
      const itemIdToRemove = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== itemIdToRemove);

      const totalQuantityAfterRemove = updatedCart.reduce((total, item) => total + item.quantity, 0);
      const totalPriceAfterRemove = updatedCart.reduce((total, item) => total + item.quantity * item.price, 0);

      return {
        ...state,
        cart: updatedCart,
        totalQuantity: totalQuantityAfterRemove,
        totalPrice: totalPriceAfterRemove,
      };

    case 'INCREASE_ITEM_QUANTITY':
      const itemIdToIncrease = action.payload;
      const updatedCartWithIncreasedQuantity = state.cart.map((item) => {
        if (item.id === itemIdToIncrease) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      const totalQuantityAfterIncrease = updatedCartWithIncreasedQuantity.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPriceAfterIncrease = updatedCartWithIncreasedQuantity.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      return {
        ...state,
        cart: updatedCartWithIncreasedQuantity,
        totalQuantity: totalQuantityAfterIncrease,
        totalPrice: totalPriceAfterIncrease,
      };

    case 'DECREASE_ITEM_QUANTITY':
      const itemIdToDecrease = action.payload;
      const updatedCartWithDecreasedQuantity = state.cart.map((item) => {
        if (item.id === itemIdToDecrease) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      const updatedCartWithoutZeroQuantity = updatedCartWithDecreasedQuantity.filter(
        (item) => item.quantity > 0
      );

      const totalQuantityAfterDecrease = updatedCartWithoutZeroQuantity.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const totalPriceAfterDecrease = updatedCartWithoutZeroQuantity.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );

      return {
        ...state,
        cart: updatedCartWithoutZeroQuantity,
        totalQuantity: totalQuantityAfterDecrease,
        totalPrice: totalPriceAfterDecrease,
      };

    default:
      return state;
  }
};

// CartProvider component
const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  // Calculate the total when the cart changes
  useEffect(() => {
    const totalQuantity = cartState.cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartState.cart.reduce((total, item) => total + item.quantity * item.price, 0);
    dispatch({ type: 'GET_CART_TOTAL', totalQuantity, totalPrice });
  }, [cartState.cart]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;