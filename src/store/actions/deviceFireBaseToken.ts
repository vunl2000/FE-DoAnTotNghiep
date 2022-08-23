import { DEVICE_TOKEN, AllDispatchProps } from './types';

export const deviceToken = () => {
    return {
        type: DEVICE_TOKEN,
    };
};

// export const getBanner = () => async (dishpatch: AllDispatchProps) => {
//   await axios({
//     method: 'GET',
//     url: API_URL + API_GET_ALL_BANNER,
//     headers: {},
//   })
//     .then(res => dishpatch({type: BANNER_APP, payload: res.data}))
//     .catch(err => console.log(err));
// };
