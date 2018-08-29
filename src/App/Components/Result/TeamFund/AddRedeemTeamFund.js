import React from 'react';
import propTypes from 'prop-types';

require('./AddRedeemTeamFund.css');

/** Add or Redeem a team member fund. */
export class AddRedeemTeamFund extends React.Component {
  /** Fetch team fund type on mount. */
  componentWillMount() {
    this.props.fetchFundTypes();
  }

  /** Return Add/Redeem team fund type component.
   * @return {object} component for add/redeem
   */
  render() {
    return (
      <div id='team-fund-add-redeem-container-id'
           className='team-fund-add-redeem-container'>
        <select id='team-fund-action-select-id'
                className='add-redeem-ream-fund-select'>
          <option value='CREDIT'>Add</option>
          <option value='DEBIT'>Redeem</option>
        </select>

        <select id='team-fund-select-type-id'
                className='add-redeem-ream-fund-select'>
        {
          this.props.fundTypes.map((fund) => (
            <option value={fund.id} key={fund.id}>{fund.type}</option>))
        }
        </select>

        <div className='team-fund-amount-container'>
          Amount: <input id='team-fund-amount-id'
                         className='add-redeem-input-amount'/>
        </div>
        <button id='team-fund-submit-button-id'
                className='team-fund-submit-button'>Submit</button>
      </div>
    );
  }
}

AddRedeemTeamFund.propTypes = {
  fetchFundTypes: propTypes.func.isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
};
