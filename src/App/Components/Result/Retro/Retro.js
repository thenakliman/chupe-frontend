import React from 'react';
import propTypes from 'prop-types';
import {ACTION_ITEM, DONE_WELL, NEED_IMPROVEMENT, retroStateToMessageMapping} from './constants';
/* eslint-disable */
import {AddRetroPoint} from './AddRetroPoint'
import {AddActionItem} from './AddActionItem'
import {history} from '../../../utils/history'
/* eslint-enable */
require('./Retro.css');

export class Retro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {creatingRetroPoint: false, creatingRetroPointType: ''};
    this.createRetroPoint = this.createRetroPoint.bind(this);
    this.createActionItem = this.createActionItem.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
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
    this.props.getActionItems(this.props.match.params.id);
    this.props.getAllRetros();
    this.props.getUsers();
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

  createActionItem(actionItem) {
    history.push('/practices-assessment');
    actionItem['retroId'] = this.props.match.params.id;
    this.props.createActionItem(actionItem);
    this.toggleCreatingRetroPoint();
    this.setState({creatingRetroPointType: ''});
  }

  changeStatus(status) {
    this.props.changeStatus(this.props.match.params.id, status);
  }

  renderActionItem() {
    return this.props.actionItems.map(
        (actionItem) => <div key={actionItem.id} id={`action-item-${actionItem.id}`} className={'action-item'}>
          <div className={'action-item-header'}>
            <div className={'action-item-text'} id={`action-item-text-${actionItem.id}`}>
              Assigned To:
            </div>
            <div className={'action-item-assigned'} id={`action-item-${actionItem.id}`}>
              {actionItem.assignedTo}
            </div>
          </div>
          <div className={'retro-point-description'} id={`action-item-description-${actionItem.id}`}>
            {actionItem.description}
          </div>
        </div>
    );
  }

  renderBasedOnFilter(filterFunction) {
    return this.props.retroPoints.map(
        (retroPoint) => filterFunction(retroPoint) &&
            <div key={retroPoint.id} id={`retro-point-${retroPoint.id}`} className={'retro-point'}>
              <div className={'retro-point-header'}>
                <div className={'retro-point-vote-text'} id={`retro-point-vote-text-${retroPoint.id}`}
                     onClick={() => this.props.vote(this.props.match.params.id, retroPoint.id)}>
                  Vote
                </div>
                <div className={'retro-point-votes'} id={`retro-point-votes-${retroPoint.id}`}>
                  {retroPoint.votes}
                </div>
              </div>
              <div className={'retro-point-description'} id={`retro-point-description-${retroPoint.id}`}>
                {retroPoint.description}
              </div>
            </div>
    );
  }

  render() {
    const status = this.props.retros.filter(
        (retro) => retro.id === parseInt(this.props.match.params.id))[0].status;

    const nextStatus = {
      'CREATED': 'IN_PROGRESS',
      'IN_PROGRESS': 'CLOSED',
    };

    return (<div id='retro-points-container-id' className='retro-points-container'>
      {['CREATED', 'IN_PROGRESS'].includes(status) && <button
          id={'change-status-id'}
          className={'change-status-button'}
          onClick={() => this.changeStatus(nextStatus[status])}>
        {retroStateToMessageMapping[status]}
      </button>}
      {this.state.creatingRetroPoint &&
      [DONE_WELL, NEED_IMPROVEMENT].includes(this.state.creatingRetroPointType) &&
      <AddRetroPoint createRetroPoint={(description) => this.createRetroPoint(description)}
                     closeAddRetroPointPopUp={this.toggleCreatingRetroPoint}/>}
      {this.state.creatingRetroPoint &&
      [ACTION_ITEM].includes(this.state.creatingRetroPointType) &&
      <AddActionItem users={this.props.users} createActionItem={this.createActionItem}
                     closeAddActionItemPopUp={this.toggleCreatingRetroPoint}/>}
      <div className='retro-point-header-container'>
        <div className='retro-point-section'>
          Need Improvement
        </div>
        <button
            id='retro-button-for-need-improvement-id'
            className='add-retro-point'
            type='button'
            onClick={() => this.toggleCreatingRetroPoint(NEED_IMPROVEMENT)}>
          Add Point
        </button>
      </div>
      <hr className='horizontal-line'/>
      <div className='retro-point-category'>
        {this.renderBasedOnFilter(
            (retroPoint) => NEED_IMPROVEMENT === retroPoint.type)}
      </div>
      <div className='retro-point-header-container'>
        <div className='retro-point-section'>
          Done Well
        </div>
        <button
            id='retro-button-for-done-well-id'
            className='add-retro-point'
            type='button'
            onClick={() => this.toggleCreatingRetroPoint(DONE_WELL)}>
          Add Point
        </button>
      </div>
      <hr className='horizontal-line'/>
      <div className='retro-point-category'>
        {this.renderBasedOnFilter(
            (retroPoint) => DONE_WELL === retroPoint.type)}
      </div>
      {status === 'IN_PROGRESS' && <div className={'retro-action-item-container'}>
        <div className='retro-point-header-container'>
          <div className='retro-point-section'>Action Items</div>
          <button id='retro-button-for-action-item-id'
                  className='add-retro-point'
                  type='button'
                  onClick={() => this.toggleCreatingRetroPoint(ACTION_ITEM)}
          >
            Add Action Item
          </button>
        </div>
        <hr className='horizontal-line'/>
        <div className='retro-point-category'>
          {this.renderActionItem()}
        </div>
      </div>}
    </div>);
  }
}

Retro.propTypes = {
  actionItems: propTypes.array.isRequired,
  users: propTypes.array.isRequired,
  createActionItem: propTypes.func.isRequired,
  retroPoints: propTypes.array.isRequired,
  getAllRetros: propTypes.func.isRequired,
  vote: propTypes.func.isRequired,
  getRetroPoints: propTypes.func.isRequired,
  createRetroPoint: propTypes.func.isRequired,
  getUsers: propTypes.func.isRequired,
  changeStatus: propTypes.func.isRequired,
};
