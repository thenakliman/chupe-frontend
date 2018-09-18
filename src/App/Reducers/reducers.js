import {users} from './userReducers';
import {questions} from './questionReducers';
import {combineReducers} from 'redux';
import {currentView} from './currentViewReducers';
import {loggedInUserDetails} from './loginReducers';
import {answers} from './answerReducers';
import {fund} from './fundReducers';
import {tasks} from './taskReducers';


export const rootReducers = combineReducers({
  answers,
  users,
  questions,
  currentView,
  fund,
  tasks,
  loggedInUserDetails,
});
