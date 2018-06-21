import {currentView} from './currentViewReducers';

describe('current view reducer', () => {
    it('should provide existing view for other actions', () => {
        const initialStoreState = {};
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
                isWaitingForResponse: false,
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
        expect(nextState).toEqual({isWaitingForResponse: true});
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
});
