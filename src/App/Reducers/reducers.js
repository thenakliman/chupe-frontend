import {users} from './userReducers';
import {questions} from './questionReducers';
import {combineReducers} from 'redux';
import {currentView} from './currentViewReducers';
import {loggedInUserDetails} from './loginReducers';


export const rootReducers = combineReducers({
  users,
  questions,
  currentView,
  loggedInUserDetails,
});
