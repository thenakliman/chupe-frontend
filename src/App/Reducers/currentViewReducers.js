import {ActionTypes} from '../Actions/ActionTypes';
import {RESULT_COMPONENTS} from '../Components/constants';

const initialCurrentView = {
    view: RESULT_COMPONENTS.USER_COMPONENT,
    isWaitingForResponse: false,
    currentQuestion: null,
    isEditingQuestion: false,
};

export const currentView = (state=initialCurrentView, action) => {
    switch (action.type) {
        case ActionTypes.CHANGE_RESULT_VIEW:
            return Object.assign({}, state, {view: action.payload});
        case ActionTypes.UPDATE_LOADER_STATUS:
            return Object.assign(
                {},
                state,
                {isWaitingForResponse: action.payload}
            );
        case ActionTypes.SET_CURRENT_QUESTION:
            return Object.assign(
                {},
                state,
                {currentQuestion: action.payload}
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
