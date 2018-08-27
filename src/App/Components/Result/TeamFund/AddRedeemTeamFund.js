import React from 'react';
import propTypes from 'prop-types';

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
      <div id='team-fund-add-redeem-container-id'>
        <select id='team-fund-action-select-id'>
          <option value='CREDIT'>Add</option>
          <option value='DEBIT'>Redeem</option>
        </select>
        <select id='team-fund-select-type-id'>
        {
          this.props.fundTypes.map((fund) => (
            <option value={fund.id} key={fund.id}>{fund.type}</option>))
        }
        </select>
        <input id='team-fund-amount-id'/>
        <button id='team-fund-submit-button-id'>Submit</button>
      </div>
    );
  }
}

AddRedeemTeamFund.propTypes = {
  fetchFundTypes: propTypes.func.isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
};
