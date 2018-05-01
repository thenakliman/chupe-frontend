import propTypes from 'prop-types';
import React from 'react';

require('./UserResult.css');

/**
* User result component of the application.
*
* @author: thenakliman
*/
export class UserResult extends React.Component {
/**
* User result component of the application.
*
* @return {Object} UserResult component.
*/
  render() {
    return (
        <div className='UserResult'>
          <ul id='all-users-list'>
          {
            this.props.users.map((user) =>(
                <li key={`${user.userName}`}>
                    {user.firstName} {user.secondName} {user.email}
                </li>))
          }
          </ul>
        </div>
    );
  }
}

UserResult.propTypes = {
  users: propTypes.arrayOf(propTypes.object).isRequired,
};
