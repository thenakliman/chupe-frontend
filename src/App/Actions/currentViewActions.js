import {ActionTypes} from './ActionTypes';

export const changeCurrentView = (view) => {
    return {
        type: ActionTypes.CHANGE_RESULT_VIEW,
        payload: view,
    };
};

export const setCurrentQuestion = (questionID) => {
    return {
        type: ActionTypes.SET_CURRENT_QUESTION,
        payload: questionID,
    };
};

export const setIsEditingQuestion = (isEditing) => {
    return {
        type: ActionTypes.SET_IS_EDITING_QUESTION,
        payload: isEditing,
    };
};
