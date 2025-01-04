export const totalItem = (cart)=>{
  return cart.reduce((sum, product)=> sum + product.quantity, 0)
}

export const totalPrice = (cart)=>{
  return cart.reduce((total, product)=> total + product.price * product.quantity, 0)
}



const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      console.log("add");
      
      return [...state, action.item = {
        _id: action.item._id,
        image: action.item.image,
        name: action.item.name,
        price: action.item.price,
        quantity: 1
      }];
    case "Remove":
      console.log("remove");
      return state.filter(p => p._id !== action._id)

    case "Increase":
      let indexI = state.findIndex(p => p._id === action._id);
      state[indexI].quantity += 1
      return [...state];
    case "Decrease":
      const indexD = state.findIndex(p => p._id === action._id);
      state[indexD].quantity -= 1;
      return [...state];

    case "Empty":
      console.log("empty");

    default:
      [...state, state.quantity = 1];

      return state;
  }
};

export default CartReducer;
