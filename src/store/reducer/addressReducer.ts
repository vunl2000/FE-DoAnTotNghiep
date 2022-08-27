import {makeId} from '../../utils/Utilities';
import {
  GET_PROVINCE,
  SET_DEFAULT_ADDRESS,
  ADD_LIST_ADDRESS,
  CLEAR_ALL_ADDRESS,
} from '../actions/types';

const initalState = {
  province: [],
  listAddress: [],
};
export interface Address {
  id: string;
  numberPhone: string;
  subNumberPhone?: string;
  lastName: string;
  firstName: string;
  fullAddress: string;
  cityProvince: string;
  district: string;
  commune: string;
  codeZip: string;
  default: boolean;
}
export default (state = initalState, {payload, type}: any) => {
  switch (type) {
    case GET_PROVINCE:
      return {
        ...state,
        province: payload.results,
      };

    case ADD_LIST_ADDRESS:
      const address: Address = {
        id: makeId(8),
        numberPhone: payload.item.numberPhone,
        subNumberPhone: payload.item.subNumberPhone,
        lastName: payload.item.lastName,
        firstName: payload.item.firstName,
        fullAddress: payload.item.fullAddress,
        cityProvince: payload.item.cityProvince,
        district: payload.item.district,
        commune: payload.item.commune,
        codeZip: payload.item.codeZip,
        default: payload.isDefault,
      };
      const addressDefault: Address = {
        id: makeId(8),
        numberPhone: payload.item.numberPhone,
        subNumberPhone: payload.item.subNumberPhone,
        lastName: payload.item.lastName,
        firstName: payload.item.firstName,
        fullAddress: payload.item.fullAddress,
        cityProvince: payload.item.cityProvince,
        district: payload.item.district,
        commune: payload.item.commune,
        codeZip: payload.item.codeZip,
        default: true,
      };
      if (state.listAddress.length === 0) {
        return {
          ...state,
          listAddress: [...state.listAddress, addressDefault],
        };
      } else if (state.listAddress && payload.isDefault) {
        return {
          ...state,
          listAddress: state.listAddress
            .map((item: Address) => ({
              ...item,
              default: false,
            }))
            .concat(address),
        };
      } else {
        return {
          ...state,
          listAddress: [...state.listAddress, address],
        };
      }

    case SET_DEFAULT_ADDRESS:
      return {
        ...state,
        listAddress: state.listAddress.map((_item: Address) =>
          _item.id === payload.id
            ? {..._item, default: true}
            : {..._item, default: false},
        ),
      };

    case CLEAR_ALL_ADDRESS:
      return {
        province: [],
        listAddress: [],
      };

    default:
      return state;
  }
};
