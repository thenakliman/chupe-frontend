import thunk from 'redux-thunk';
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Provider} from 'react-redux'; // eslint-disable-line no-unused-vars
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducers} from './App/Reducers/reducers';
import {connectRouter} from 'connected-react-router';
/* eslint-disable */
import {ConnectedRouter} from 'connected-react-router';
import {Route} from 'react-router';
/* eslint-disable */
import LoginContainer from './App/Components/Login/LoginContainer';
import UserResultContainer from
    './App/Components/Result/User/UserResultContainer';

import QuestionContainer from
    './App/Components/Result/Question/QuestionContainer';

import AskQuestionContainer from
    './App/Components/Result/Question/AskQuestionContainer';

import ShowQuestionContainer from
    './App/Components/Result/Question/ShowQuestionContainer';

import TeamFundContainer from './App/Components/Result/TeamFund/TeamFundContainer';

import {MenuBar} from './App/Components/MenuBar/Menu';
import {history} from './App/utils/history';

const store = createStore(
    connectRouter(history)(rootReducers),
    composeWithDevTools(applyMiddleware(thunk))
);


const ListQuestionComponent = (props) => (
  <div>
    <MenuBar {...props}/>
    <QuestionContainer {...props}/>
  </div>
)

const ShowQuestionComponent = (props) => (
  <div>
    <MenuBar {...props}/>
    <ShowQuestionContainer {...props}/>
  </div>
)

const AskQuestionComponent = (props) => (
  <div>
    <MenuBar {...props}/>
    <AskQuestionContainer {...props}/>
  </div>
)

const UserComponent = (props) => (
  <div>
    <MenuBar {...props}/>
    <UserResultContainer {...props}/>
  </div>
)

const TeamFundComponent = (props) => (
  <div>
    <MenuBar {...props}/>
    <TeamFundContainer {...props}/>
  </div>
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
       <div>
         <Route exact path="/" component={LoginContainer} />
         <Route path="/users" component={UserComponent}/>
         <Route path="/questions" component={ListQuestionComponent}/>
         <Route path="/team-funds" component={TeamFundComponent}/>
         <Route path="/question/:id/view" component={ShowQuestionComponent}/>
         <Route exact path="/question/ask" component={AskQuestionComponent}/>
       </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
