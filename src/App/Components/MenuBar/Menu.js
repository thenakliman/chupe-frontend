import React from 'react';
import {removeCookies} from '../../utils/cookies';
import {history} from '../../utils/history';
import PropTypes from 'prop-types';
import {LOCATION_TO_TAB_MAPPING} from './constants';

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
     * Checks tab for a given location.
     * @param {string} location to check for
     * @param {string} tabName to check if tab belongs to location
     * @return {bool} returns whether a tab belong to given location or not
     */
    doesLocationMatchTab(location, tabName) {
      const locationPrefix = location.split('/')[1];
      return LOCATION_TO_TAB_MAPPING[tabName].some(
          (tab) => tab.startsWith(locationPrefix));
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
              <a href='#/dashboard'
                 id="home-tab"
                 className={this.doesLocationMatchTab(location, 'home')?
                            'Selected-Tab':
                            'Tab'}>
                     Home
              </a>
              <a href='#/users'
                 id="users-tab"
                 className={this.doesLocationMatchTab(location, 'users')?
                            'Selected-Tab':
                            'Tab'}>
                     Users
              </a>
              <a href='#/questions'
                 id="questions-tab"
                 className={this.doesLocationMatchTab(location, 'questions')?
                            'Selected-Tab':
                            'Tab'}>
                   Questions
              </a>
              <a href='#/team-funds'
                 id="team-funds-tab"
                 className={this.doesLocationMatchTab(location, 'team-funds')?
                            'Selected-Tab':
                            'Tab'}>
                   Funds
              </a>
              <a href='#/tasks'
                 id="tasks-tab"
                 className={this.doesLocationMatchTab(location, 'tasks')?
                            'Selected-Tab':
                            'Tab'}>
                   Tasks
              </a>
              <a href='#/retros'
                 id="retros-tab"
                 className={this.doesLocationMatchTab(location, 'retros')?
                            'Selected-Tab':
                            'Tab'}>
                   Retrospections
              </a>
              <a href='#/feedback-sessions'
                 id="feedback-session-tab"
                 className={this.doesLocationMatchTab(
                    location, 'feedbackSessions')?
                            'Selected-Tab':
                            'Tab'}>
                   Feedbacks
              </a>
              <a href='#/meetings'
                 id="meetings-tab"
                 className={this.doesLocationMatchTab(
                    location, 'meetings')?
                            'Selected-Tab':
                            'Tab'}>
                   Meetings
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
