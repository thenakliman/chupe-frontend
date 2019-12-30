import React from 'react';
import propTypes from 'prop-types';
import {ACTION_ITEM, DONE_WELL, NEED_IMPROVEMENT, retroStateToMessageMapping} from './constants';
/* eslint-disable */
import {AddRetroPoint} from './AddRetroPoint'
import {AddActionItem} from './AddActionItem'
import {ActionItemTile, RetroPointTile} from "./tiles/Tile";
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
    actionItem['retroId'] = this.props.match.params.id;
    this.props.createActionItem(actionItem);
    this.toggleCreatingRetroPoint();
    this.setState({creatingRetroPointType: ''});
  }

  changeStatus(status) {
    this.props.changeStatus(this.props.match.params.id, status);
  }

  renderActionItem() {
    return <div className={'tiles'}>
      {
        this.props.actionItems.map(
            actionItem => <ActionItemTile assignedTo={actionItem.assignedTo}
                                          description={actionItem.description}/>)
      }
    </div>
  }

  renderBasedOnFilter(filterFunction, className) {
    return <div className={'tiles'}>
      {
        this.props.retroPoints
            .filter((retroPoint) => filterFunction(retroPoint))
            .map(retroPoint => <RetroPointTile retroId={this.props.match.params.id}
                                               retroPointId={retroPoint.id}
                                               votes={retroPoint.votes}
                                               className={className}
                                               onVoteCast={this.props.vote}
                                               description={retroPoint.description}/>)
      }
    </div>
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
            (retroPoint) => NEED_IMPROVEMENT === retroPoint.type, 'u-red-background-color')}
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
            (retroPoint) => DONE_WELL === retroPoint.type, 'u-green-background-color')}
      </div>
      {['IN_PROGRESS', 'CLOSED'].includes(status) && <div className={'retro-action-item-container'}>
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
