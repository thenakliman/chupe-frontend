/* eslint-disable */
import React from 'react';
import ResultContainer from './Components/Result/ResultContainer';
import Login from './Components/Login/Login';
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
      </div>
      <div className='result-container'>
        <ResultContainer/>
      </div>
    </div>);
}

export default Chupe;
