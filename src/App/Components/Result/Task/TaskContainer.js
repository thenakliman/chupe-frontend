import {Task} from './Task';
import {connect} from 'react-redux';
import {getAllTasks} from '../../../Actions/taskActions';

export const mapStateToProps = (state) => ({
    tasks: state.tasks,
});

export const mapDispatchToProps = (dispatch) => ({
    getTasks: () => {
        dispatch(getAllTasks());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
