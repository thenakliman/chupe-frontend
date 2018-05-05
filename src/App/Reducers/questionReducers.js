import {ActionTypes} from '../Actions/ActionTypes';

const initialData = {
  questionsData: [],
};

export const questions = (state=initialData, action) => {
  switch (action.type) {
      case ActionTypes.ADD_QUESTIONS:
        return Object.assign({}, state, {questionsData: action.payload});
      default:
        return {...state};
  }
};
