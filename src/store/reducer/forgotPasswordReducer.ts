// import {
//   ActionProps,
//   REG_LOADING,
//   CLEAR_REGISTER,
//   USER_GMAIL_SUCCES,
//   USER_GMAIL_FAIL,
//   USER_GMAIL_CL
// } from '../actions/types';

// const initalState = {
//   cfLoading: false,
//   isCfGmail: null,
//   userGmail: null,
//   data: null,
// };
// export default (state = initalState, { payload, type }: ActionProps) => {
//   switch (type) {
//     case REG_LOADING:
//       return {
//         ...state,
//         cfLoading: true,
//       };
//     case USER_GMAIL_SUCCES:
//       return {
//         ...state,
//         data: payload,
//         cfLoading: false,
//         isCfGmail: true,
//       };
//     case USER_GMAIL_FAIL:
//       return {
//         ...state,
//         cfLoading: false,
//         isCfGmail: null,
//         userGmail: null,
//         data: null,
//       };
//     case USER_GMAIL_CL:
//       return {
//         cfLoading: false,
//         isCfGmail: null,
//         userGmail: null,
//         data: null,
//       };

//     default:
//       return state;
//   }
// };
