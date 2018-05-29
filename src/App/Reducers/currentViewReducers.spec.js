import {currentView} from './currentViewReducers';
import {RESULT_COMPONENTS} from '../Components/constants';

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
        expect(nextState).toEqual(
            {
                view: RESULT_COMPONENTS.USER_COMPONENT,
                isWaitingForResponse: false,
                currentQuestion: null,
            }
        );
    });
    it('should store loader visibility parameter comes in action', () => {
        const initialStoreState = {isWaitingForResponse: false};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'UPDATE_LOADER_STATUS',
                    payload: true,
                }
        );
        initialStoreState.isWaitingForResponse = true;
        expect(nextState).toEqual(initialStoreState);
    });
    it('should provide existing loader visibility for other actions', () => {
        const initialStoreState = {isWaitingForResponse: false};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'INCORRECT_ACTION',
                    payload: 'FAKE_PAYLOAD',
                }
        );
        expect(nextState).toEqual(initialStoreState);
    });

    it('should provide default currentQuestion for empty store and other actions', () => {
        const nextState = currentView(
                undefined,
                {
                    type: 'INCORRECT_ACTION',
                    payload: 'FAKE_PAYLOAD',
                }
        );
        expect(nextState).toEqual(
            {
                view: RESULT_COMPONENTS.USER_COMPONENT,
                isWaitingForResponse: false,
                currentQuestion: null
            }
        );
    });

    it('should store current Question parameter comes in action', () => {
        const currentQuestionId = 1;
        const initialStoreState = {currentQuestion: null};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'SET_CURRENT_QUESTION',
                    payload: currentQuestionId,
                }
        );
        initialStoreState.view = currentQuestionId;
        expect(nextState).toEqual({currentQuestion: currentQuestionId});
    });

    it('should provide existing view for actions other than SET_CURRENT_QUESTION', () => {
        const initialStoreState = {view: 'fakeTab', currentQuestion: null};
        const nextState = currentView(
                initialStoreState,
                {
                    type: 'INCORRECT_ACTION',
                    payload: 'FAKE_PAYLOAD',
                }
        );
        expect(nextState).toEqual(initialStoreState);
    });
});
