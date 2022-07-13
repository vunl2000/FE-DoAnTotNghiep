import {
  ActionProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
  GET_NUMBER_CART,
} from './../actions/types';

interface Cart {
  id: string;
  name: string;
  qty: number;
  price: number;
  priceSale: number;
  size: string;
  color: string;
}

const initalState = {
  isLoading: false,
  products: [],
  carts: [],
  numberCart: 0,
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
      const cart = {
        id: payload.item._id,
        quantity: 1,
        name: payload.item.title_product,
        image: payload.item.imageProduct[0],
        price: payload.item.price,
        size: payload.size,
        color: payload.color,
      };

      if (state.numberCart == 0) {
        return {
          ...state,
          carts: [...state.carts, cart],
          numberCart: state.numberCart + 1,
        };
      } else {
        const inCart = state.carts.find((item: any) =>
          item.color === payload.color && item.size === payload.size
            ? true
            : false,
        );

        return {
          ...state,
          carts: inCart
            ? state.carts.map((item: any) =>
                item.color === payload.color && item.size === payload.size
                  ? {...item, quantity: item.quantity + 1}
                  : item,
              )
            : [...state.carts, cart],
          numberCart: state.numberCart + 1,
        };
      }

    case GET_NUMBER_CART:
      return {
        ...state,
      };

    default:
      return state;
  }
};
