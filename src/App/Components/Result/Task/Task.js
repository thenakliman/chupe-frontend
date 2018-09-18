import propTypes from 'prop-types';
import React from 'react';
import {capitalizeFirstLetter} from '../../../utils/stringUtils';

require('./Task.css');

/**
* Task result component of the application.
*
* @author: thenakliman
*/
export class Task extends React.Component {
/** Fetch tasks from the backend and update in the store. */
  componentDidMount() {
    this.props.getTasks();
  }
/**
* Task result component of the application.
*
* @return {Object} TaskResult component.
*/
  render() {
    return (
        <div className='task-result-container'>
          <table id='team-fund-table-id'>
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
  getTasks: propTypes.func.isRequired,
};
