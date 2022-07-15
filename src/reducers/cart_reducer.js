import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, type } = action.payload;
    // increase

    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        let tempAmount;
        // increase
        if (type === 'inc') {
          tempAmount = item.amount + 1;
          if (tempAmount > item.max) {
            tempAmount = item.max;
          }
        }
        // decrease
        if (type === 'dec') {
          tempAmount = item.amount - 1;
          if (tempAmount < 1) {
            tempAmount = 1;
          }
        }
        return { ...item, amount: tempAmount };
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { total_amount, total_items } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;

        total.total_amount += price * amount;
        total.total_items += amount;

        return total;
      },
      { total_items: 0, total_amount: 0 }
    );

    return { ...state, total_amount, total_items };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
