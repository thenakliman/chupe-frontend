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
                    <div id="user-tab" onClick={this.props.getUsers}
                     className="Tab">
                        Users
                    </div>
                </header>
            </div>
        );
    }
}

MenuBar.propTypes = {
  getUsers: propTypes.func.isRequired,
};

export default MenuBar;
