import {ActionTypes} from '../Actions/ActionTypes';
import {RESULT_COMPONENTS} from '../Components/constants';

const initialCurrentView = {
    view: RESULT_COMPONENTS.USER_COMPONENT,
};

export const currentView = (state=initialCurrentView, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_RESULT_VIEW:
            return Object.assign({}, state, {view: action.payload});
        default:
            return {...state};
    }
};
