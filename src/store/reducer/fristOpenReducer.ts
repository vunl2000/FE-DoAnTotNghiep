import { OPEN_APP, BANNER_APP, CHECK_NOTIFICATION } from './../actions/types';

const initalState = {
  firstOpen: false,
  banner: [],
  initialRoute: null
};

export default (state = initalState, { payload, type }: any) => {
  switch (type) {
    case OPEN_APP: {
      return {
        ...state,
        firstOpen: true,
      };
    }

    case BANNER_APP: {
      return {
        ...state,
        banner: payload.data,
      };
    }
    default:
      return state;
  }
};
