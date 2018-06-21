import {ActionTypes} from '../Actions/ActionTypes';

const initialCurrentView = {
    isWaitingForResponse: false,
};

export const currentView = (state=initialCurrentView, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_LOADER_STATUS:
            return Object.assign(
                {},
                state,
                {isWaitingForResponse: action.payload}
            );
        default:
            return {...state};
    }
};
