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
  }


  /** Handle changes on the question fields
  * @param {object} event containing new modified value
  */
  handleUsername(event) {
      this.setState({username: event.target.value});
  }

  /** handle starting of the app */
  handleSubmit() {
      this.props.authenticate(this.state.username);

      if(this.props.username) {
        history.push('/users');
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
/*
        <div>
          <img id='login-page-icon-id'
            src='http://allyoucanlove.com/wp-content/uploads/2012/11/Steve-McCurry-India-Railway16-540x360.jpg'
            height="360" width="540"
            alt='login page image'
            className='login-page-icon'
          />
        </div>
*/
