import {users} from './userReducers';
import {questions} from './questionReducers';
import {combineReducers} from 'redux';
import {currentView} from './currentViewReducers'


export const rootReducers = combineReducers({
  users,
  questions,
  currentView,
});
