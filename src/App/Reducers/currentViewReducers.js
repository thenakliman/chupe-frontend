import {ActionTypes} from '../Actions/ActionTypes';

const initialCurrentView = {
    view: null,
};

export const currentView = (state=initialCurrentView, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_RESULT_VIEW:
            return Object.assign({}, state, {view: action.payload});
        default:
            return {...state};
    }
};
