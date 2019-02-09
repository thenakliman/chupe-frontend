import React from 'react';
import propTypes from 'prop-types';

require('./Retro.css');

export class Retro extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      this.props.getRetroPoints(this.props.match.params.id);
    }

    render() {
      return <div id='retro-points-container-id' className='retro-points-container'>
        {
          this.props.retroPoints.map(retroPoint =>
              <div key={retroPoint.id} id={`retro-point-${retroPoint.id}`}
                   className={'retro-point'}
              >
                  {retroPoint.description}
              </div>
          )
        }
      </div>
    }
}

Retro.propTypes = {
  retroPoints: propTypes.array.isRequired,
  getRetroPoints: propTypes.func.isRequired
}