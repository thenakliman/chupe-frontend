import {ActionTypes} from './ActionTypes';

export const changeCurrentView = (view) => {
    return {
        type: ActionTypes.CHANGE_RESULT_VIEW,
        payload: view,
    };
};
