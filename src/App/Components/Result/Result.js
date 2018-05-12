import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import UserResultContainer from './User/UserResultContainer';
import AskQuestionContainer from './Question/AskQuestionContainer';
import QuestionContainer from './Question/QuestionContainer';
/* eslint-enable */
import {RESULT_COMPONENTS} from './../constants';


/** Component for displaying result.
*
* Base on view in store, it renders component in result section
*/
export class Result extends React.Component {
    /** Render method for displaying Result in result section.

        @Return {object} component based on the view in store. view
                is updated on click of tab.
    */
    render() {
        switch (this.props.view) {
            case RESULT_COMPONENTS.QUESTION_COMPONENT:
                return (
                    <div id='list-question-result-container'>
                        <QuestionContainer/>
                    </div>
                );
            case RESULT_COMPONENTS.ASK_QUESTION_COMPONENT:
                return (
                    <div id='ask-question-result-container'>
                        <AskQuestionContainer />
                    </div>
                );
            case RESULT_COMPONENTS.USER_COMPONENT:
            default:
                return (
                    <div id='user-result-container'>
                        <UserResultContainer />
                    </div>
                );
        }
    }
}

Result.propTypes = {
  view: propTypes.string.isRequired,
};
