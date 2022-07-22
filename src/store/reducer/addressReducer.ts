import {GET_PROVINCE} from '../actions/types';

const initalState = {
  province: [],
  district: [],
  commune: [],
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case GET_PROVINCE:
      return {
        ...state,
        province: payload,
      };
    default:
      return state;
  }
};
