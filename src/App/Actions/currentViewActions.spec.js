import {ActionTypes} from './ActionTypes';
import {changeCurrentView} from './currentViewActions';

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
});
