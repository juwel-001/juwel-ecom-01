import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item)=> item.id === product.id);
    if(itemInCart){
      // Increase the quantity if already in cart
      
      const updatedCart = cartItem.map((item)=> {
        return item.id === product.id? {...item, quantity: item.quantity + 1}: item;
      });
      setCartItem(updatedCart);
      toast.success("Product quantity is increased!")

    }
    else{
      // Add new item with quantity 1
      setCartItem([...cartItem, {...product, quantity: 1}]);
      toast.success("New product added successfully!")

    }
   
  };

  const updateQuantity = (productId, action) => {
       setCartItem( cartItem.map((item)=>{
          if(item.id === productId){
            let newUnit = item.quantity;
            if(action === "increase"){
              newUnit = newUnit + 1;
              toast.success("Item's quantity is increased successfully!")
            }else if(action === "decrease"){
              newUnit = newUnit - 1;
              toast.success("Item's quantity is decreased successfully!")
            }return newUnit >0 ? {...item, quantity: newUnit}: null;
          }
          return item;

        }).filter(item => item != null))
  }

  // Delete items from the cart

  const deletItem = (productId)=>{
     setCartItem(cartItem.filter(item => item.id !== productId))
     toast.success("Item successfully deleted from the cart!")
  }
 

  return (
    <CartContext.Provider value={{ cartItem,setCartItem, addToCart, updateQuantity, deletItem }}>
      {children}
    </CartContext.Provider>
  );
};
