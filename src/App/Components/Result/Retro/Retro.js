import React from 'react';
import propTypes from 'prop-types';
import {DONE_WELL, NEED_IMPROVEMENT} from './constants';
/* eslint-disable */
import {AddRetroPoint} from './AddRetroPoint';
/* eslint-enable */
require('./Retro.css');

export class Retro extends React.Component {
    constructor(props) {
      super(props);
      this.state = {creatingRetroPoint: false, creatingRetroPointType: ''};
      this.createRetroPoint = this.createRetroPoint.bind(this);
      this.toggleCreatingRetroPoint = this.toggleCreatingRetroPoint.bind(this);
    }

    toggleCreatingRetroPoint(type) {
      this.setState({
        creatingRetroPoint: !this.state.creatingRetroPoint,
        creatingRetroPointType: type,
      });
    }

    componentWillMount() {
      this.props.getRetroPoints(this.props.match.params.id);
    }

    createRetroPoint(description) {
      this.props.createRetroPoint({
          description: description,
          type: this.state.creatingRetroPointType,
          retroId: this.props.match.params.id,
      });
      this.toggleCreatingRetroPoint();
      this.setState({creatingRetroPointType: ''});
    }

    renderBasedOnFilter(filterFunction) {
        return this.props.retroPoints.map(
          (retroPoint) => filterFunction(retroPoint) &&
              <div key={retroPoint.id} id={`retro-point-${retroPoint.id}`}
                   className={'retro-point'}
              >
                  <div className={'retro-point-header'}>
                      <div className={'retro-point-vote-text'}
                               id={`retro-point-vote-text-${retroPoint.id}`}
                               onClick={() => this.props.vote(
                                    this.props.match.params.id, retroPoint.id)}>
                               Vote
                      </div>
                      <div className={'retro-point-votes'}
                           id={`retro-point-votes-${retroPoint.id}`}>
                        {retroPoint.votes}
                      </div>
                      </div>
                  <div className={'retro-point-description'}
                       id={`retro-point-description-${retroPoint.id}`}>
                    {retroPoint.description}
                  </div>
              </div>
          );
    }

    render() {
      return (<div id='retro-points-container-id'
                  className='retro-points-container'>
        {this.state.creatingRetroPoint && <AddRetroPoint
            createRetroPoint={(description) =>
                this.createRetroPoint(description)}
            closeAddRetroPointPopUp={this.toggleCreatingRetroPoint} />
        }
        <div className='retro-point-header-cotainer'>
          <div className='retro-point-section'>Need Improvement</div>
          <button id='retro-button-for-need-improvement-id'
            className='add-retro-point'
            type='button'
            onClick={() => this.toggleCreatingRetroPoint(NEED_IMPROVEMENT)}
          >
              Add Point
          </button>
        </div>
        <hr className='horizontal-line'/>
        <div className='retro-point-category'>
            {this.renderBasedOnFilter(
                (retroPoint) => NEED_IMPROVEMENT === retroPoint.type)}
        </div>
        <div className='retro-point-header-cotainer'>
          <div className='retro-point-section'>Done Well</div>
          <button id='retro-button-for-done-well-id'
            className='add-retro-point'
            type='button'
            onClick={() => this.toggleCreatingRetroPoint(DONE_WELL)}
          >
              Add Point
          </button>
        </div>
        <hr className='horizontal-line'/>
        <div className='retro-point-category'>
            {this.renderBasedOnFilter(
                (retroPoint) => DONE_WELL === retroPoint.type)}
        </div>
      </div>);
    }
}

Retro.propTypes = {
  retroPoints: propTypes.array.isRequired,
  vote: propTypes.func.isRequired,
  getRetroPoints: propTypes.func.isRequired,
  createRetroPoint: propTypes.func.isRequired,
};
