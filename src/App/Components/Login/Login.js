import React from 'react';

require('./Login.css');

/** Login component **/
export class Login extends React.Component {
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
          alt='login page image'/>
        </div>
        <div>
          <button id='login-page-get-started-button-id'
                  className='get-started-button'
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }
}
