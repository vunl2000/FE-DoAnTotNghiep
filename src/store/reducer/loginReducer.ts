import {
  ActionProps,
  REG_LOADING,
  LOG_LOADING,
  USER_LOADING,
  REGISTER_SUCCES,
  LOGOUT_ERROR,
  AUTH_ERROR,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  USER_LOADER,
} from '../actions/types';

const initalState = {
  regLoading: false,
  logLoading: false,
  isAuthenticated: null,
  user: null,
};
export default (state = initalState, {payload, type}: ActionProps) => {
  switch (type) {
    case REG_LOADING:
      return {
        ...state,
        regLoading: true,
      };
    case LOG_LOADING:
      return {
        ...state,
        logLoading: true,
      };
    case USER_LOADING:
      return {
        ...state,
        logLoading: true,
      };
    case REGISTER_SUCCES:
      return {
        ...state,
        regLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_ERROR:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        regLoading: false,
        user: null,
        isAuthenticated: null,
        logLoading: false,
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        ...payload,
        regLoading: false,
        isAuthenticated: true,
      };
    case USER_LOADER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        logLoading: false,
      };

    default:
      return state;
  }
};
