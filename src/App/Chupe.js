/* eslint-disable */
import React from 'react';
import MenuBarContainer from './Components/MenuBar/MenuBarContainer';
import ResultContainer from './Components/Result/ResultContainer';
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
        <ResultContainer/>
      </div>
    </div>);
}

export default Chupe;
