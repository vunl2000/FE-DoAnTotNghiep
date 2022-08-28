import { DEVICE_TOKEN, AllDispatchProps } from './types';

export const deviceToken = () => {
    return {
        type: DEVICE_TOKEN,
    };
};
