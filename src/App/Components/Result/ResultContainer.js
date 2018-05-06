import {connect} from 'react-redux';
import {Result} from './Result';

export const mapStateToProps = (state) => ({
    view: state.currentView.view,
});

connect(mapStateToProps, null)(Result);
