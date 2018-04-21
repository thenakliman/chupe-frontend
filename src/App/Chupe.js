import React from 'react'; // eslint-disable-line no-unused-vars

require('./chupe.css');

/**
* Root component of the application.
*
* @author: thenakliman
* @param {Object} props, properties for the component.
* @return {Chupe} the root component for the application.
*/
function Chupe(props) {
  return <div> <header className="Header"> Welcome to Chupe</header> </div>;
}

export default Chupe;
