import {
  ActionProps,
  LOG_LOADING,
  USER_LOADING,
  LOGOUT_SUCCES,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCES,
  USER_LOADER,
} from '../actions/types';

const initalState = {
  logLoading: false,
  isAuthenticated: null,
  user: null,
};
export default (state = initalState, {payload, type}: ActionProps) => {
  switch (type) {
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
    case LOGOUT_SUCCES:
    case AUTH_ERROR:
    case LOGIN_FAIL:
      return {
        logLoading: false,
        isAuthenticated: null,
        user: null,
      };
    case LOGIN_SUCCES:
      return {
        ...state,
        ...payload,
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
