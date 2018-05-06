import React from 'react';
import propTypes from 'prop-types';

require('./Menu.css');


/**
* User result component of the application.
*
* @author: thenakliman
*/
export class MenuBar extends React.Component {
    /**
    * User result component of the application.
    *
    * @return {Object} UserResult component.
    */
    render() {
        return (
            <div>
                <header id="chupe-header" className="Header">
                    <span id="users-tab" onClick={this.props.showUserTab}
                     className="Tab">
                        Users
                    </span>
                    <span id="questions-tab"
                           onClick={this.props.showQuestionTab}
                     className="Tab">
                        Questions
                    </span>
                </header>
            </div>
        );
    }
}

MenuBar.propTypes = {
  showUserTab: propTypes.func.isRequired,
  showQuestionTab: propTypes.func.isRequired,
};
