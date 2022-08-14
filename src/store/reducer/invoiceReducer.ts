import {
  LOADED_INVOICE_USER,
  LOADED_INVOICE_DETAIL_USER,
  LOADED_INVOICE_ERR,
  INVOICE_CLEAR,
  TypeBill,
} from './../actions/types';

const initalState = {
  listInvoice: [] as TypeBill[],
  isFalse: false as boolean,
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
      };
    }

    default:
      return state;
  }
};
