import {
  ActionProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
  CHECK_OUT,
} from './../actions/types';
const initalState = {
  isLoading: false,
  products: [],
  cartProducts: [],
};

export default (state = initalState, {payload, type}: ActionProps) => {
  switch (type) {
    case lOADING_PRODUCT:
      return {
        ...state,
        isLoading: false,
      };
    case LOADED_PRODUCT:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case ADD_TO_CART:
      const updateCarts = state.cartProducts.filter(
        (p: any) => p._id !== payload._id,
      );
      const updateProduct = state.cartProducts.filter(
        (p: any) => p._id !== payload._id,
      );
      return {
        ...state,
        cartProducts: [payload, ...updateCarts],
        products: [payload, ...updateProduct],
      };
    case CHECK_OUT:
      return {...state, cartProducts: [], products: payload};
    default:
      return state;
  }
};
