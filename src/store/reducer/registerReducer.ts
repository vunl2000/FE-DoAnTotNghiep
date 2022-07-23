import {
    ActionProps,
    REG_LOADING,
    REGISTER_SUCCES,
    AUTH_ERROR,
    REGISTER_FAIL,
    USER_LOADER,
  } from '../actions/types';
  
  const initalState = {
    regLoading: false,
    isRegistered: null,
    userRegister: null,
  };
  export default (state = initalState, {payload, type}: ActionProps) => {
    switch (type) {
      case REG_LOADING:
        return {
          ...state,
          regLoading: true,
        };
      case REGISTER_SUCCES:
        return {
          ...state,
          ...payload,
          regLoading: false,
          isRegistered: true,
        };
      case AUTH_ERROR:
      case REGISTER_FAIL:
        return {
          ...state,
          regLoading: false,
          userRegister: null,
          isRegistered: null,
        };
      case USER_LOADER:
        return {
          ...state,
          userRegister: payload,
          isRegistered: true,
        };
  
      default:
        return state;
    }
  };
  