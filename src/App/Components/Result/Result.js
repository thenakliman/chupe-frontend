import React from 'react';
import propTypes from 'prop-types';
/* eslint-disable */
import UserResultContainer from './UserResultContainer';
import QuestionResultContainer from './QuestionResultContainer';
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
                    <div id='question-result-container'>
                        <QuestionResultContainer />;
                    </div>
                );
            case RESULT_COMPONENTS.USER_COMPONENT:
            default:
                return (
                    <div id='user-result-container'>
                        <UserResultContainer />;
                    </div>
                );
        }
    }
}

Result.propTypes = {
  view: propTypes.string.isRequired,
};
