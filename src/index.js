import thunk from 'redux-thunk';
import React from 'react'; // eslint-disable-line no-unused-vars
import {render} from 'react-dom';
import {Provider} from 'react-redux'; // eslint-disable-line no-unused-vars
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducers} from './App/Reducers/reducers';
/* eslint-disable */
import {ConnectedRouter, connectRouter} from 'connected-react-router'
import {Route} from 'react-router'
/* eslint-disable */
import LoginContainer from './App/Components/Login/LoginContainer'
import UserResultContainer from './App/Components/Result/User/UserResultContainer'
import TaskContainer from './App/Components/Result/Task/TaskContainer'
import QuestionContainer from './App/Components/Result/Question/QuestionContainer'
import AskQuestionContainer from './App/Components/Result/Question/AskQuestionContainer'
import ShowQuestionContainer from './App/Components/Result/Question/ShowQuestionContainer'
import RetrosContainer from './App/Components/Result/Retro/RetrosContainer'
import RetroContainer from './App/Components/Result/Retro/RetroContainer'
import TeamFundContainer from './App/Components/Result/TeamFund/TeamFundContainer'
import ShowFundContainer from './App/Components/Result/TeamFund/ShowFundContainer'
import FeedbackSessionsContainer from './App/Components/Result/Feedback/FeedbackSessionsContainer'
import FeedbacksContainer from './App/Components/Result/Feedback/FeedbacksContainer'
import MeetingsContainer from './App/Components/Result/Meeting/MeetingsContainer'
import MeetingDiscussionItemsContainer from './App/Components/Result/Meeting/MeetingDiscussionItemsContainer'
import ActionItemContainer from './App/Components/Result/ActionItem/ActionItemContainer'
import PracticesAssessmentContainer from './App/Components/Result/Retro/PracticesAssessmentContainer'
import Loader from './App/Components/Result/Common/Loader'
import Notification from './App/Components/Result/Common/NotificationContainer'

import {MenuBar} from './App/Components/MenuBar/Menu'
import {history} from './App/utils/history'

require('./global.css');

const store = createStore(
    connectRouter(history)(rootReducers),
    composeWithDevTools(applyMiddleware(thunk))
);

const ListQuestionComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <QuestionContainer {...props}/>
    </div>
);

const ShowQuestionComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <ShowQuestionContainer {...props}/>
    </div>
);

const AskQuestionComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <AskQuestionContainer {...props}/>
    </div>
);

const UserComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <UserResultContainer {...props}/>
    </div>
);

const TeamFundComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <TeamFundContainer {...props}/>
    </div>
);

const ShowFundComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <ShowFundContainer {...props}/>
    </div>
);

const TaskComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <TaskContainer {...props}/>
    </div>
);

const RetrosComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <RetrosContainer {...props}/>
    </div>
);

const RetroComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <RetroContainer {...props}/>
    </div>
);

const FeedbackSessionComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Loader/>
      <Notification/>
      <FeedbackSessionsContainer {...props}/>
    </div>
);

const FeedbacksComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Notification/>
      <Loader/>
      <FeedbacksContainer {...props}/>
    </div>
);

const MeetingsComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Notification/>
      <Loader/>
      <MeetingsContainer {...props}/>
    </div>
);

const MeetingDiscussionItemsComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Notification/>
      <Loader/>
      <MeetingDiscussionItemsContainer {...props}/>
    </div>
);

const ActionItemsComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Notification/>
      <Loader/>
      <ActionItemContainer {...props}/>
    </div>
);

const PracticeAssessmentComponent = (props) => (
    <div>
      <MenuBar {...props}/>
      <Notification/>
      <Loader/>
      <PracticesAssessmentContainer {...props}/>
    </div>
);

render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className={'root-div'}>
          <Route exact path='/' component={LoginContainer}/>
          <Route path='/dashboard' component={ActionItemsComponent}/>
          <Route path='/users' component={UserComponent}/>
          <Route path='/questions' component={ListQuestionComponent}/>
          <Route path='/team-funds' component={TeamFundComponent}/>
          <Route path='/tasks' component={TaskComponent}/>
          <Route path='/question/:id/view' component={ShowQuestionComponent}/>
          <Route path='/funds/:id' component={ShowFundComponent}/>
          <Route path='/retro/:id' component={RetroComponent}/>
          <Route path='/retros' component={RetrosComponent}/>
          <Route path='/retro-practices-assessment/:id' component={PracticeAssessmentComponent}/>
          <Route path='/feedback-sessions' component={FeedbackSessionComponent}/>
          <Route path='/feedbacks/:id' component={FeedbacksComponent}/>
          <Route path='/meetings' component={MeetingsComponent}/>
          <Route path='/meeting/:id' component={MeetingDiscussionItemsComponent}/>
          <Route exact path='/question/ask' component={AskQuestionComponent}/>
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
