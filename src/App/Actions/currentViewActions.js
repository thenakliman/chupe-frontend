import {ActionTypes} from './ActionTypes';


export const setIsEditingQuestion = (isEditing) => {
    return {
        type: ActionTypes.SET_IS_EDITING_QUESTION,
        payload: isEditing,
    };
};
