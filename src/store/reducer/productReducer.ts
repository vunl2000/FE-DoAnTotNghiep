import AsyncStorage from '@react-native-async-storage/async-storage';
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
  TypeCartItem,
  TypeProductItem,
  DELETE_TO_CART,
  CHANGE_HEART,
} from './../actions/types';

const initalState = {
  isLoading: false as boolean,
  products: [] as TypeProductItem[],
  carts: [] as TypeCartItem[],
  numberCart: 0 as number,
  allSelected: false as boolean,
};

export default (state = initalState, {payload, type}: ActionProps) => {
  //AsyncStorage.getItem('persist:root').then(data => console.log(data));
  switch (type) {
    case lOADING_PRODUCT:
      return {
        ...state,
        isLoading: true,
      };
    case LOADED_PRODUCT:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case ADD_TO_CART:
      const cart: TypeCartItem = {
        id: makeId(8),
        _id: payload.item._id,
        qty: 1,
        selected: false,
        titleProduct: payload.item.titleProduct,
        imageProduct: payload.item.imageProduct[0],
        price: payload.item.price,
        priceSale: payload.item.priceSale,
        size: payload.size,
        color: payload.color,
        code: payload.item.code,
        trademark: payload.item.trademark,
      };

      if (state.numberCart == 0) {
        return {
          ...state,
          carts: [...state.carts, cart],
          numberCart: state.numberCart + 1,
          allSelected: false,
        };
      } else {
        const inCart = state.carts.find((item: TypeCartItem) =>
          item.color === payload.color && item.size === payload.size
            ? true
            : false,
        );

        return {
          ...state,
          carts: inCart
            ? state.carts.map((item: TypeCartItem) =>
                item.color === payload.color && item.size === payload.size
                  ? {...item, qty: item.qty + 1}
                  : item,
              )
            : [...state.carts, cart],
          numberCart: state.numberCart + 1,
          allSelected: false,
        };
      }

    case GET_NUMBER_CART:
      return {
        ...state,
      };
    case CHANGE_SELECT_CART:
      let count = 0;
      state.carts.map((item: TypeCartItem) =>
        !item.selected ? (count += 1) : count,
      );
      let check = state.carts.find((item: any) =>
        !item.selected && item.id === payload.id ? true : false,
      );
      return {
        ...state,
        carts: state.carts.map((item: TypeCartItem) =>
          item.id === payload.id ? {...item, selected: !item.selected} : item,
        ),
        allSelected: count === 1 && check ? true : false,
      };
    case SELECT_ALL_CART:
      return {
        ...state,
        carts: state.carts.map((item: TypeCartItem) => ({
          ...item,
          selected: !state.allSelected,
        })),
        allSelected: !state.allSelected,
      };
    case INCREASE_QUANTITY:
      return {
        ...state,
        numberCart: state.numberCart + 1,
        carts: state.carts.map((item: TypeCartItem) =>
          item.id === payload.id ? {...item, qty: item.qty + 1} : item,
        ),
      };
    case DECREASE_QUANTITY:
      let product: any = state.carts.find(
        (item: TypeCartItem) => item.id === payload.id,
      );

      if (product.qty > 1) {
        return {
          ...state,
          numberCart: state.numberCart - 1,
          carts: state.carts.map((item: TypeCartItem) =>
            item.id === payload.id ? {...item, qty: item.qty - 1} : item,
          ),
        };
      }
      return {
        ...state,
      };
    case DELETE_TO_CART: {
      if (state.carts.length === 1) {
        return {
          ...state,
          carts: [],
          numberCart: 0,
          allSelected: false,
        };
      } else {
        let itemCart: TypeCartItem | any = state.carts.find(
          (item: TypeCartItem) => item.id === payload.id,
        );

        return {
          ...state,
          carts: state.carts.filter(
            (item: TypeCartItem) => item.id !== payload.id,
          ),
          numberCart: state.numberCart - itemCart.qty,
        };
      }
    }
    case CHANGE_HEART:
      return {
        ...state,
        products: state.products.map((item: any) =>
          item._id === payload.id
            ? {...item, heart_active: !item.heart_active}
            : item,
        ),
      };
    default:
      return state;
  }
};
