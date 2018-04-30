import thunk from 'redux-thunk';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import Chupe from './App/Chupe'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import { rootReducers } from './App/Reducers/reducers'


const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

render(
  <Provider store={store}>
      <Chupe />
  </Provider>,
  document.getElementById('root')
);
