import React from 'react';
import {history} from '../../utils/history';
import propTypes from 'prop-types';

require('./Login.css');

/** Login component **/
export class Login extends React.Component {
  /** constructor for the Login component.
   *  @param {object} props received by this component
   */
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }


  /** Handle changes on the question fields
   * @param {object} event containing new modified value
   */
  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  /** Handle changes on the question fields
   * @param {object} event containing new modified value
   */
  handlePassword(event) {
    this.setState({password: event.target.value});
  }

  /** handle starting of the app */
  async handleSubmit() {
    await this.props.authenticate(this.state.username, this.state.password);

    if (this.props.username) {
      history.push('/dashboard');
    }
  }

  /** Renders Login component.
   * @return {object} returns login component
   */
  render() {
    return (
        <div>
          <form id='login-form-id' className='login-form'>
            <div className='login-page-username-div'>
              <div>
                <label>Username</label>
              </div>
              <div>
                <input id='login-page-username-field-id'
                       type='text'
                       value={this.state.value}
                       onChange={this.handleUsername}
                       className='login-page-input'/>
              </div>
            </div>
            <div className='login-page-password-div'>
              <div>
                <label>
                  Password
                </label>
              </div>
              <div>
                <input type='password'
                       id='login-page-password-field-id'
                       onChange={this.handlePassword}
                       value={this.state.value}
                       className='login-page-input'/>
              </div>
            </div>
            <div>
              <button id='login-page-get-started-button-id'
                      className='get-started-button'
                      onClick={this.handleSubmit}
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
    );
  }
}

Login.propTypes = {
  authenticate: propTypes.func.isRequired,
};
