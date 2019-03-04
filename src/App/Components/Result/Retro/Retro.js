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
      return <div id='retro-points-container-id'
                  className='retro-points-container'>
        {
          this.props.retroPoints.map((retroPoint) =>
              <div key={retroPoint.id} id={`retro-point-${retroPoint.id}`}
                   className={'retro-point'}
              >
                  <div className='retro-point-votes'
                       id={`retro-point-votes-${retroPoint.id}`}>
                    {retroPoint.votes}
                  </div>
                  <div className='retro-point-vote-text'
                       id={`retro-point-vote-text-${retroPoint.id}`}
                       onClick={() => this.props.vote(
                                this.props.match.params.id, retroPoint.id)}>
                       Vote
                  </div>
                  <div className='retro-point-description'
                       id={`retro-point-description-{retroPoint.id}`}>
                    {retroPoint.description}
                  </div>
              </div>
          )
        }
      </div>;
    }
}

Retro.propTypes = {
  retroPoints: propTypes.array.isRequired,
  vote: propTypes.func.isRequired,
  getRetroPoints: propTypes.func.isRequired,
};
