import {
  LOADED_INVOICE_USER,
  LOADED_INVOICE_DETAIL_USER,
  LOADED_INVOICE_ERR,
  INVOICE_CLEAR,
  TypeBill,
  RATE_ALL_PRODUCT,
  RATE_STARTS_PRODUCT,
  RATE_COMENTS_PRODUCT,
  RATE_CLEAR,
} from './../actions/types';

const initalState = {
  listInvoice: [] as TypeBill[],
  isFalse: false as boolean,
  listAllComment: [] as any,
  listAllStart: [] as any,
  isStart: 0 as number,
  small: 0 as number,
  large: 0 as number,
  fit: 0 as number,
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case LOADED_INVOICE_USER: {
      return {
        ...state,
        listInvoice: payload.bill,
      };
    }
    case LOADED_INVOICE_ERR: {
      return {
        ...state,
        isFalse: true,
      };
    }
    case INVOICE_CLEAR: {
      return {
        listInvoice: [],
        isFalse: false,
        listAllComment: [],
        listAllStart: [],
        isStart: 0,
        small: 0,
        large: 0,
        fit: 0,
      };
    }

    case RATE_ALL_PRODUCT: {
      return {
        ...state,
        listAllComment: payload,
      };
    }

    case RATE_STARTS_PRODUCT: {
      return {
        ...state,
        listAllStart: payload.data,
        isStart: payload.isStart,
        small: payload.small,
        large: payload.large,
        fit: payload.fit,
      };
    }
    case RATE_COMENTS_PRODUCT: {
      return {
        listInvoice: [],
        isFalse: false,
        listAllComment: [],
      };
    }
    case RATE_CLEAR: {
      return {
        ...state,
        listAllStart: [],
        listAllComment: [],
        isStart: 0,
        small: 0,
        large: 0,
        fit: 0,
      };
    }

    default:
      return state;
  }
};
