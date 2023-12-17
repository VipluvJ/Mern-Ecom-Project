import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
//   userList: localStorage.getItem("userList")
//     ? JSON.parse(localStorage.getItem("userList"))
//     : null,

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      if (state.cartItems.length > 0 && action.payload.clicked) {
        let itemIndex = state.cartItems.findIndex((item) => {
          return item.Id === action.payload.identifier;
        });
        switch (action.payload.clicked) {
          case "increase":
            if (state.cartItems[itemIndex].quantity >= 1) {
              state.cartItems[itemIndex].quantity += 1;
              if (state.cartItems[itemIndex].quantity === 1) {
                state.cartItems[itemIndex].prodPrice = Number(
                  action.payload.prices
                );
              } else {
                state.cartItems[itemIndex].prodPrice =
                  Number(state.cartItems[itemIndex].quantity) *
                  Number(action.payload.prices);
              }

              let dataInc = JSON.parse(localStorage.getItem("cartItems"));
              dataInc[itemIndex].prodPrice =
                state.cartItems[itemIndex].prodPrice;
              dataInc[itemIndex].quantity = state.cartItems[itemIndex].quantity;
              localStorage.setItem("cartItems", JSON.stringify(dataInc));
            }

            break;
          case "decrease":
            let dataDec = JSON.parse(localStorage.getItem("cartItems"));
            if (state.cartItems[itemIndex].quantity >= 2) {
              state.cartItems[itemIndex].quantity -= 1;
              if (state.cartItems[itemIndex].quantity === 1) {
                state.cartItems[itemIndex].prodPrice = Number(
                  action.payload.prices
                );
              } else {
                state.cartItems[itemIndex].prodPrice =
                  Number(state.cartItems[itemIndex].quantity) *
                  Number(action.payload.prices);
              }

              localStorage.setItem(
                "cartItems",
                JSON.stringify(state.cartItems)
              );

              dataDec[itemIndex].prodPrice =
                state.cartItems[itemIndex].prodPrice;

              dataDec[itemIndex].quantity = state.cartItems[itemIndex].quantity;
              localStorage.setItem("cartItems", JSON.stringify(dataDec));
            } else {
              const removeItem = dataDec.pop(itemIndex, itemIndex + 1);
              console.log({ ...dataDec });
              console.log({ ...removeItem });
              localStorage.setItem("cartItems", JSON.stringify(dataDec));
            }

            break;
          default:
            null;
        }
      } else {
        const temp = {
          Id: action.payload.id,
          prodName: action.payload.name,
          prodImg: action.payload.images,
          prodBrand: action.payload.brand,
          prodPrice: action.payload.prices,
          quantity: 1,
        };
        state.cartItems = [...state.cartItems, temp];
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      //   localStorage.setItem("userList", JSON.stringify(action.payload));
    },
    
    //     delUserList: (state) => {
    //       state.userList = null;
    //       localStorage.removeItem("userList");
    //     },
  },
});

export const { addToCart, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
