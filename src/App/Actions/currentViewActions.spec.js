import {ActionTypes} from './ActionTypes';
import {changeCurrentView, setCurrentQuestion} from './currentViewActions';

describe('current view action creator', () => {
    it('should create action with given data in payload', () => {
        const nextView = 'NEXT_VIEW';
        const action = changeCurrentView(nextView);
        expect(action).toEqual(
            {
                type: ActionTypes.CHANGE_RESULT_VIEW,
                payload: nextView,
            }
        );
    });

    it('should create set current question action with given data in payload', () => {
      const currentQuestionID = 1;
      const action = setCurrentQuestion(currentQuestionID);
      expect(action).toEqual(
        {
            type: ActionTypes.SET_CURRENT_QUESTION,
            payload: currentQuestionID,
        });
    });
});
