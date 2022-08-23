import { DEVICE_TOKEN } from './../actions/types';

const initalState = {
    deviceCall: false,
};

export default (state = initalState, { payload, type }: any) => {
    switch (type) {
        case DEVICE_TOKEN: {
            return {
                ...state,
                deviceCall: true,
            };
        }

        default:
            return state;
    }
};
