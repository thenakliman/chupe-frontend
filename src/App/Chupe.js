/* eslint-disable */
import React from 'react';
import MenuBarContainer from './Components/MenuBar/MenuBarContainer';
import UserResultContainer from './Components/Result/UserResultContainer';
/* eslint-enable */

require('./Chupe.css');

/**
* Root component of the application.
*
* @author: thenakliman
* @param {Object} props, properties for the component.
* @return {Chupe} the root component for the application.
*/
function Chupe(props) {
  return (
    <div className='Chupe'>
      <div>
        <MenuBarContainer />
      </div>
      <div>
        <UserResultContainer />
      </div>
    </div>);
}

export default Chupe;
