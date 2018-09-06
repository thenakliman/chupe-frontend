import propTypes from 'prop-types';
import React from 'react';

require('./UserResult.css');

/**
* User result component of the application.
*
* @author: thenakliman
*/
export class UserResult extends React.Component {
/** Fetch users from the backend and update in the store. */
  componentDidMount() {
    this.props.getUsers();
  }
/**
* User result component of the application.
*
* @return {Object} UserResult component.
*/
  render() {
    return (
        <div className='UserResult'>
          {
            this.props.users.map((user) =>(
                <div key={`${user.userName}`} className={'user-tile'}>
                    <img src='fake' className='user-image'/>
                    <div>{user.firstName} {user.lastName}</div>
                </div>))
          }
        </div>
    );
  }
}

UserResult.propTypes = {
  users: propTypes.arrayOf(propTypes.object).isRequired,
  getUsers: propTypes.func.isRequired,
};
