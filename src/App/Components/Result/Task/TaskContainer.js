import {Task} from './Task';
import {connect} from 'react-redux';
import {createTask, getAllTasks, updateTask} from '../../../Actions/taskActions';

export const mapStateToProps = (state) => ({
  tasks: state.tasks,
  currentUser: state.loggedInUserDetails.userName,
});

export const mapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getAllTasks()),
  createTask: (task) => dispatch(createTask(task)),
  updateTask: (task) => dispatch(updateTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
