import {ADD_ITEM_HISTORY, CLEAR_ITEM_HISTORY, AllDispatchProps} from './types';

export const eventAddItem = (item: any) => {
  return {
    type: ADD_ITEM_HISTORY,
    payload: item,
  };
};

export const eventRemoveItem = () => {
  return {
    type: CLEAR_ITEM_HISTORY,
    payload: null,
  };
};
