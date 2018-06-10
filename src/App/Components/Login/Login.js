import React from 'react';
import {history} from '../../utils/history';

require('./Login.css');

/** Login component **/
export class Login extends React.Component {
  /** constructor for the Login component.
   *  @param {object} props received by this component
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /** handle starting of the app */
  handleSubmit() {
      history.push('/users');
  }
  /** Renders Login component.
   * @return {object} returns login component
   */
  render() {
    return (
      <div>
        <div>
        <img id='login-page-icon-id'
          src='http://allyoucanlove.com/wp-content/uploads/2012/11/Steve-McCurry-India-Railway16-540x360.jpg'
          height="360" width="540"
          alt='login page image'
          className='login-page-icon'/>
        </div>
        <div>
          <button id='login-page-get-started-button-id'
                  className='get-started-button'
                  onClick={this.handleSubmit}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }
}
