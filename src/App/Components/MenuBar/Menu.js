import React from 'react';
import {removeCookies} from '../../utils/cookies';
import {history} from '../../utils/history';
import PropTypes from 'prop-types';

require('./Menu.css');


/**
* User result component of the application.
*
* @author: thenakliman
*/
export class MenuBar extends React.Component {
    /** logout user session. */
    logout() {
      removeCookies();
      history.push('/');
    }
    /**
    * User result component of the application.
    *
    * @return {Object} UserResult component.
    */
    render() {
      const location = this.props.location.pathname;
      return (
        <div>
          <header id="chupe-header" className="Header">
            <span className='manu-bar-tabs'>
              <a href='#/users'
                 id="users-tab"
                 className={location === '/users'?'Selected-Tab': 'Tab'}>
                     Users
              </a>
              <a href='#/questions'
                 id="questions-tab"
                 className={location === '/questions'?'Selected-Tab': 'Tab'}>
                   Questions
              </a>
              <a href='#/team-funds'
                 id="team-funds-tab"
                 className={location === '/team-funds'?'Selected-Tab': 'Tab'}>
                   Team Funds
              </a>
              <a href='#/tasks'
                 id="tasks-tab"
                 className={location === '/tasks'?'Selected-Tab': 'Tab'}>
                   Tasks
              </a>
            </span>
            <span className='manu-bar-tabs'>
              <div id='menu-logout-container'
                   className='menu-logout-container'
                   onClick={this.logout}>
                logout
              </div>
            </span>
          </header>
        </div>
        );
    }
}


MenuBar.propTypes = {
  location: PropTypes.object.isRequired,
};
