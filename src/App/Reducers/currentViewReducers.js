import {ActionTypes} from '../Actions/ActionTypes';

const initialCurrentView = {
    isWaitingForResponse: false,
    isEditingQuestion: false,
};

export const currentView = (state=initialCurrentView, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_LOADER_STATUS:
            return Object.assign(
                {},
                state,
                {isWaitingForResponse: action.payload}
            );
        case ActionTypes.SET_IS_EDITING_QUESTION:
            return Object.assign(
                {},
                state,
                {isEditingQuestion: action.payload}
            );
        default:
            return {...state};
    }
};
