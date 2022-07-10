import {GET_ERRORS, CLEAR_ERRORS} from './types';

// Return Errors
export const returnErrors = (
  code: string | number,
  msg: string,
  id: string,
) => {
  return {
    type: GET_ERRORS,
    payload: {code, msg, id},
  };
};

//Clear error
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
