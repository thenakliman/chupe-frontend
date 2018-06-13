import {ActionTypes} from './ActionTypes';
import {setIsEditingQuestion} from './currentViewActions';

describe('current view action creator', () => {
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
