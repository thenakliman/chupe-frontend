import React from 'react';
import propTypes from 'prop-types';

require('./Menu.css');


/**
* User result component of the application.
*
* @author: thenakliman
*/
class MenuBar extends React.Component {
    /**
    * User result component of the application.
    *
    * @return {Object} UserResult component.
    */
    render() {
        return (
            <div>
                <header id="chupe-header" className="Header">
                    <span id="users-tab" onClick={this.props.getUsers}
                     className="Tab">
                        Users
                    </span>
                    <span id="questions-tab" onClick={this.props.getUsers}
                     className="Tab">
                        Questions
                    </span>
                </header>
            </div>
        );
    }
}

MenuBar.propTypes = {
  getUsers: propTypes.func.isRequired,
};

export default MenuBar;
