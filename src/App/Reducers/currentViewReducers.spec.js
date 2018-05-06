import {currentView} from './currentViewReducers';
import {RESULT_COMPONENTS} from '../Components/constants'

describe('current view reducer', () => {
    it('should store view parameter comes in action', () => {
        const tabType = 'question-tab';
        const initialStoreState = {view: null};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'CHANGE_RESULT_VIEW',
                    payload: tabType,
                }
        );
        initialStoreState.view = tabType;
        expect(nextState).toEqual(initialStoreState);
    });
    it('should provide existing view for other actions', () => {
        const initialStoreState = {view: 'fakeTab'};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'INCORRECT_ACTION',
                    payload: 'FAKE_PAYLOAD',
                }
        );
        expect(nextState).toEqual(initialStoreState);
    });
    it('should provide default view for empty store and other actions', () => {
        const nextState = currentView(
                undefined,
                {
                    type: 'INCORRECT_ACTION',
                    payload: 'FAKE_PAYLOAD',
                }
        );
        expect(nextState).toEqual({view: RESULT_COMPONENTS.USER_COMPONENT});
    });
});
