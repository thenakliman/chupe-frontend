import PropTypes from 'prop-types';
import React from 'react';

/**
* Show Fund component of the application.
*
* @author: thenakliman
*/
export class ShowFund extends React.Component {
  /** Fetch team fund while mounting this component */
  componentWillMount() {
    this.props.fetchFunds(this.props.match.params.id);
  }

  /** Component for show funds.
   * @return {object} Return component for showing funds
   */
  render() {
    return (
      <div id='user-fund-container-id' className='team-fund-container'>
        <table id='fund-table-id'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Owner</th>
              <th>type</th>
              <th>Amount</th>
              <th>Added On</th>
            </tr>
          </thead>
          <tbody>
          { this.props.funds.map((fund, index) => (
              <tr key={`${fund.id}`}>
                <td>{index+1}</td>
                <td>{fund.owner}</td>
                <td>{fund.type}</td>
                <td>{'CREDIT' === fund.transactionType? fund.amount: -fund.amount}</td>
                <td>{fund.createdAt}</td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    );
  }
}

ShowFund.propTypes = {
  fetchFunds: PropTypes.func.isRequired,
  funds: PropTypes.array,
};
