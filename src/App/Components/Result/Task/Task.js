import propTypes from 'prop-types';
import React from 'react';
import {capitalizeFirstLetter} from '../../../utils/stringUtils';
import * as constants from '../constants';

require('./Task.css');

/**
* Task result component of the application.
*
* @author: thenakliman
*/
export class Task extends React.Component {
  /** Constructor for the component.
   *  @param {object} props
   */
  constructor(props) {
    super(props);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.createTask = this.createTask.bind(this);
    this.state = {description: ''};
  }

  /** Update state for the change in description of the task.
   * @param {string} value of the description
   */
  handleDescriptionChange(value) {
    this.setState({description: value});
  }

  /** Fetch tasks from the backend and update in the store. */
  componentDidMount() {
    this.props.getTasks();
  }

  /** Create task on click of create button. */
  createTask() {
    const task = {
      description: this.state.description,
      progress: 0,
      state: constants.CREATED,
      createdBy: 'lal_singh',
    };
    this.props.createTask(task);
  }
/**
* Task result component of the application.
*
* @return {Object} TaskResult component.
*/
  render() {
    return (
        <div className='task-result-container'>
          <span id='task-create-container' className={'task-create-container'}>
            <input id='task-input-description'
                   className='task-input-description'
                   onChange={
                      (e) => this.handleDescriptionChange(e.target.value)}/>

            <button id='task-create-button'
                    className='task-create-button'
                    onClick={this.createTask}>
              Create
            </button>
          </span>
          <table id='team-fund-table-id'
                 className='team-fund-table-id'>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Description</th>
                <th>State</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{task.description}</td>
                    <td>{capitalizeFirstLetter(task.state)}</td>
                    <td>{task.progress}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    );
  }
}

Task.propTypes = {
  tasks: propTypes.arrayOf(propTypes.object).isRequired,
  currentUser: propTypes.string.isRequired,
  getTasks: propTypes.func.isRequired,
  createTask: propTypes.func.isRequired,
};
