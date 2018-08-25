import React from 'react';
import propTypes from 'prop-types'

export class AddRedeemTeamFund extends React.Component {
  componentWillMount() {
    this.props.fetchTeamFundTypes();
  }

  render() {
    return (
      <div id='team-fund-add-redeem-container-id'>
        <select id='team-fund-action-select-id'>
          <option value='CREDIT'>Add</option>
          <option value='DEBIT'>Redeem</option>
        </select>
        <select id='team-fund-select-type-id'>
        {
          this.props.fundTypes.map(fund => (
            <option value={fund.id} key={fund.id}>{fund.type}</option>))
        }
        </select>
        <input id='team-fund-amount-id'/>
        <button id='team-fund-submit-button-id'>Submit</button>
      </div>
    )
  }
}

AddRedeemTeamFund.propTypes = {
  fetchTeamFundTypes: propTypes.func.isRequired
}