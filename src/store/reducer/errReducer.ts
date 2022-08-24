import {CLEAR_ERRORS, GET_ERRORS,CHECK_NOTIFICATION} from './../actions/types';

const initalState = {
  code: null,
  message: {},
  id: null,
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case GET_ERRORS: {
      return {
        code: payload.code,
        message: payload.message,
        id: payload.id,
      };
    }
    case CLEAR_ERRORS: {
      return {
        code: null,
        message: {},
        id: null,
      };
    }

    case CHECK_NOTIFICATION: {
      return {
        ...state,
        initialRoute: state,
      };
    }
    default:
      return state;
  }
};
