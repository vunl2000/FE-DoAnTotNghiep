import {OPEN_APP} from '../actions/types';
const initalState = {
  firstOpen: false,
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case OPEN_APP: {
      return {
        firstOpen: true,
      };
    }
    default:
      return state;
  }
};
