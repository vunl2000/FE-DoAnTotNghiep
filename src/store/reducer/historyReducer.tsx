import {ADD_ITEM_HISTORY,CLEAR_ITEM_HISTORY} from './../actions/types';

const initalState = {
  itemHistory: [] as any[],
};

export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case ADD_ITEM_HISTORY: {
        // state.itemHistory.length
      return {
        itemHistory: [...state.itemHistory, payload],
      };
    }
    case CLEAR_ITEM_HISTORY: {
        // state.itemHistory.length
      return {
        itemHistory: [],
      };
    }

    default:
      return state;
  }
};
