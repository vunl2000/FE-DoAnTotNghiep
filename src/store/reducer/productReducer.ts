import AsyncStorage from '@react-native-async-storage/async-storage';
import {PURGE} from 'redux-persist';
import {makeId} from '../../utils/Utilities';

import {
  ActionProps,
  lOADING_PRODUCT,
  LOADED_PRODUCT,
  ADD_TO_CART,
  GET_NUMBER_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CHANGE_SELECT_CART,
  SELECT_ALL_CART,
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
  allSelected: false,
};

export default (state = initalState, {payload, type}: ActionProps) => {
  // AsyncStorage.getItem('persist:root').then(data => console.log(data));
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
        id: makeId(12),
        id_prduct: payload.item._id,
        quantity: 1,
        selected: false,
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
    case CHANGE_SELECT_CART:
      return {
        ...state,
        carts: state.carts.map((item: any) =>
          item.id === payload.id ? {...item, selected: !item.selected} : item,
        ),
        allSelected: state.carts.filter((item: any) =>
          !item.selected ? !state.allSelected : state.allSelected,
        ),
      };
    case SELECT_ALL_CART:
      return {
        ...state,
        carts: state.carts.map((item: any) => ({
          ...item,
          selected: !state.allSelected,
        })),
        allSelected: !state.allSelected,
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        numberCart: state.numberCart + 1,
        carts: state.carts.map((item: any) =>
          item.id === payload.id
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      };
    case DECREASE_QUANTITY:
      let product: any = state.carts.find(
        (item: any) => item.id === payload.id,
      );
      if (product.quantity > 1) {
        return {
          ...state,
          numberCart: state.numberCart - 1,
          carts: state.carts.map((item: any) =>
            item.id === payload.id
              ? {...item, quantity: item.quantity - 1}
              : item,
          ),
        };
      }
      return {
        ...state,
      };
    case PURGE:
      return initalState;
    default:
      return state;
  }
};
