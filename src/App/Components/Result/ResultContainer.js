import {connect} from 'react-redux';
import {Result} from './Result';

export const mapStateToProps = (state) => ({
    view: state.currentView.view,
});

export default connect(mapStateToProps, null)(Result);
