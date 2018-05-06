import {mapStateToProps} from './ResultContainer';


describe('Result container', () => {
    it('should provide view', () => {
        const viewName = 'RESULT_VIEW';
        const state = {currentView: {view: viewName}};
        const props = mapStateToProps(state);
        expect(props.view).toEqual(viewName);
    });
    it('should provide null if null is present(default conditiion)', () => {
        const state = {currentView: {view: null}};
        const props = mapStateToProps(state);
        expect(props.view).toEqual(null);
    });
});
