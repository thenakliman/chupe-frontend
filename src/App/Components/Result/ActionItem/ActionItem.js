import React from 'react';
import propTypes from 'prop-types';

require('./ActionItem.css');

export class ActionItem extends React.Component {
    componentWillMount() {
      this.props.getActionItems();
    }

    render() {
      return (
      <div id='action-item-container-id' className='action-item-container'>
          <div>
            <table id='all-action-items-ordered-list'>
              <thead>
                <tr className='action-item-table-header'>
                  <th> Description </th>
                  <th> Type </th>
                  <th> Deadline </th>
                </tr>
              </thead>
              <tbody id='all-action-item-table-body-id'
                     className={'action-item-table-body'}>
              {
                this.props.actionItems.map((actionItem) => (
                  <tr key={`${actionItem.id}`}
                      id={`action-item-row-id-${actionItem.id}`}
                      className={'selectable-row'}>
                    <td className='action-item-row'>
                            {actionItem.description}
                    </td>
                    <td> {actionItem.type}</td>
                    <td> {actionItem.deadlineToAct}</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
      </div>
      );
    }
}

ActionItem.propTypes = {
  actionItems: propTypes.array.isRequired,
  getActionItems: propTypes.func.isRequired,
};
