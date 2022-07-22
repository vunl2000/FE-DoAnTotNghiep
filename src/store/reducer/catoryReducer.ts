import {
  LOADING_CATORY,
  LOADING_CATORY_SUCCES,
  LOADING_CATORY_ERR,
  LOADING_CATORY_MEN,
  LOADING_CATORY_MEN_SUCCES,
  LOADING_CATORY_MEN_ERR,
  LOADING_CATORY_WOMEN,
  LOADING_CATORY_WOMEN_SUCCES,
  LOADING_CATORY_WOMEN_ERR,
  LOADING_CATORY_ACCESSORY,
  LOADING_CATORY_ACCESSORY_SUCCES,
  LOADING_CATORY_ACCESSORY_ERR,
} from '../actions/types';

const initalState = {
  men: [],
  women: [],
  accessory: [],
  pending: false,
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case LOADING_CATORY:
      return {
        ...state,
        pending: true,
      };
    case LOADING_CATORY_SUCCES:
      return {
        ...state,
        accessory: payload.result,
        pending: false,
      };
    case LOADING_CATORY_ERR:
      return {
        ...state,
        pending: false,
      };

    default:
      return state;
  }
};
