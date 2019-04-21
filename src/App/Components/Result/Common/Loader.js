/* eslint-disable*/
import React from 'react';
/* eslint-enable*/
import {connect} from 'react-redux';
import propTypes from 'prop-types';

require('./Loader.css');

function Loader(props) {
    return (<div>
      {
        props.show && <div className='loader-container'>
          <div className='loader'/>
        </div>
      }
    </div>);
}

Loader.propTypes = {
  show: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  show: state.loaders.length > 0,
});

export default connect(mapStateToProps, null)(Loader);
