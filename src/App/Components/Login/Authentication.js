/* eslint-disable */
import React from 'react';
import LoginContainer from './LoginContainer';

/* eslint-enable */

/** Require authentication component */
export class RequireAuthentication extends React.Component {
  /** Constructor
   * @param {object} props for rendering this component
   */
  constructor(props) {
    super(props);
    this.state = {isAuthorized: false};
    this.setUserAuthorization = this.setUserAuthorization.bind(this);
  }

  /** Set user authorization
   * @param {boolean} isAuthorized or not a user
   */
  setUserAuthorization(isAuthorized) {
    this.setState({isAuthorized: isAuthorized});
  }

  /** Renders Require Authentication component
   * @return { object } returns Required authentication component
   */
  render() {
    return (
        <div>
          {!this.state.isAuthorized ?
              <LoginContainer id='login-container'
                              onAuthorization={this.setUserAuthorization}/> :
              null};
        </div>
    );
  }
}
