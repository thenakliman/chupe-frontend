import React from 'react';
import LoginContainer from './LoginContainer'

export class RequireAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isAuthorized: false};
    this.setUserAuthorization = this.setUserAuthorization.bind(this);
  }

  setUserAuthorization(isAuthorized) {
    this.setState({isAuthorized: isAuthorized});
  }

  render() {
    return (
      <div>
        {!this.state.isAuthorized?<LoginContainer id='login-container' onAuthorization={this.setUserAuthorization}/>:null};
      </div>
    )
  }
}