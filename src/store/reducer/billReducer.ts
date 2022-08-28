import {
  CREATE_BILL,
  SENDING_DETAIL_BILL,
  RESET_BILL,
  TypeBill,
  TypeBillDetail,
  CREATE_FAIL,
  GET_SHIP_COD,
} from './../actions/types';

const initalState = {
  bill: null,
  sendDetailBill: [] as TypeBillDetail[],
  isFalse: false as boolean,
  isStep: 0 as number,
  transport: null as any,
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case CREATE_BILL: {
      return {
        ...state,
        bill: payload.bill,
        isStep: 1,
      };
    }

    case SENDING_DETAIL_BILL: {
      return {
        ...state,
        sendDetailBill: [...state.sendDetailBill, payload.mBills],
        isStep: 2,
      };
    }

    case CREATE_FAIL: {
      return {
        ...state,
        isFalse: true,
      };
    }

    case GET_SHIP_COD: {
      return {
        ...state,
        transport: payload,
      };
    }

    case RESET_BILL: {
      return {
        ...state,
        bill: [],
        sendDetailBill: [],
        isFalse: false,
        isStep: 0,
      };
    }
    default:
      return state;
  }
};
