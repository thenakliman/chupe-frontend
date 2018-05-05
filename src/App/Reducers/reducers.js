import {users} from './userReducers';
import {questions} from './questionReducers';
import {combineReducers} from 'redux';


export const rootReducers = combineReducers({
  users,
  questions,
});
