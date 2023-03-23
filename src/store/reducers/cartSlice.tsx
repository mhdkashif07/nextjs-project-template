import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFromLocalStorage } from "../../utils/utils";

interface InitialState {
  cartItems: {
    id: number;
    image: string;
    name: string;
    price: string;
    description: string;
  }[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

export const initialState = {
  //get the items from localstorage of the key set in setItems as "cartItems" and set them in cartitems and convert them in javascript
  //*localStorage.getItem() can return either a string or null. JSON.parse() requires a string, so you should test the result of localStorage.getItem() before you try to use it.
  cartItems: getFromLocalStorage("cartItems") ? JSON.parse(getFromLocalStorage("cartItems") || '{}') : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);

      //*we are checking if the item is already in the cart
      const itemIndex = state.cartItems.findIndex(
        (item: {
          articlesList: any; code: number;
        }) => item.code == action.payload.articlesList?.[0]?.code
      );
      console.log(itemIndex);


      //we are checking if the item is already in the cart we will increase the quantity of the item
      if (itemIndex >= 0) {
        console.log(itemIndex);
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} quntity is increased`, {
          position: "bottom-left",
        });
      }
      // if it's new item then we will add it to the cartItem array
      else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-left",
        });
      }

      //set items in localstorage with key and convert the data into string with stringify
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (item: { code: any; }) => item.code !== action.payload.code
      );
      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name} removed from cart`, {
        position: "bottom-left",
      });
    },

    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.success("Cart is cleared", {
        position: "bottom-left",
      });
    },

    decreaseCart(state, action) {
      console.log(action.payload);

      console.log(state.cartItems[0].code);


      const itemIndex = state.cartItems.findIndex((item: { code: any; }) => item.code === action.payload.code);
      console.log(itemIndex);


      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`${action.payload.name} cart Quantity is Decreased`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item: { code: any; }) => item.code !== action.payload.code
        );
        state.cartItems = nextCartItems;

        toast.error(`${action.payload.name} removed from cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals(state, action: PayloadAction) {
      //reduce array methods accepts two parameters first is callback function and second is initial value 
      //cartTotal will hold the initial values of total and quantity
      //cartItem will be the item which we will give each time of iteration
      let { total, quantity } = state.cartItems.reduce((cartTotal: { total: number; quantity: number; }, cartItem: { whitePrice: { price: number }; cartQuantity: number; }) => {
        //this is callback function

        //destructure the price and cartQuantity from cartItem
        const { whitePrice: { price }, cartQuantity } = cartItem
        console.log(price);


        //itemTotal will store the total amount each of the item
        const itemTotal = price * cartQuantity // we will multiply the price of the item to the quantity of the item

        cartTotal.total += itemTotal
        //get total from cartTotal because the cartTotal will have the initial value of the total and we just add the total to the itemTotal for each time iteration

        cartTotal.quantity += cartQuantity

        return cartTotal;

      }, {
        //these two are the initial values
        total: 0,
        quantity: 0
      });

      //assigning the total and quantity to the values in the state
      state.cartTotalAmount = total;
      state.cartTotalQuantity = quantity
    },

  },
});

export const { addToCart, removeFromCart, clearCart, decreaseCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;
