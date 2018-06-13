import {ActionTypes} from './ActionTypes';
import {setCurrentQuestion,
        setIsEditingQuestion} from './currentViewActions';

describe('current view action creator', () => {
    it('should return set current question action with id in payload', () => {
      const currentQuestionID = 1;
      const action = setCurrentQuestion(currentQuestionID);
      expect(action).toEqual(
        {
            type: ActionTypes.SET_CURRENT_QUESTION,
            payload: currentQuestionID,
        });
    });

    it('should return set editing question action with id in payload', () => {
      const isEditing = true;
      const action = setIsEditingQuestion(isEditing);
      expect(action).toEqual(
        {
            type: ActionTypes.SET_IS_EDITING_QUESTION,
            payload: isEditing,
        });
    });
});
