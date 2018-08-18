import React from 'react';
import {removeCookies} from '../../utils/cookies';
import {history} from '../../utils/history';

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
            <span>
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
            </span>
            <span>
              <div id='menu-logout-container' onClick={this.logout}>
                logout
              </div>
            </span>
          </header>
        </div>
        );
    }
}
