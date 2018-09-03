import React from 'react';
import propTypes from 'prop-types';

require('./AddRedeemTeamFund.css');

/** Add or Redeem a team member fund. */
export class AddRedeemTeamFund extends React.Component {
  /** Constructor for the component.
   * @param {object} props for the component
   */
  constructor(props) {
    super(props);
    this.state = {
      transactionType: '',
      fundType: '',
      amount: 0,
    };

    this.handleAmountUpdate = this.handleAmountUpdate.bind(this);
    this.handleTransactionType = this.handleTransactionType.bind(this);
    this.handleFundType = this.handleFundType.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  /** Fetch team fund type on mount. */
  componentWillMount() {
    this.props.fetchFundTypes();
  }

  /** Handle amount update.
   * @param {number} amount to be added
   */
  handleAmountUpdate(amount) {
    this.setState({amount: amount});
  }

  /** Handle fund type update.
   * @param {string} fundType
   */
  handleFundType(typeId) {
    this.setState({fundType: typeId});
  }

  /** Handle transaction type.
   * @param {string} transactionType of transaction type
   */
  handleTransactionType(transactionType) {
    this.setState({transactionType: transactionType});
  }

  /** Handle submit event of button. */
  handleClick() {
    if (this.state.amount === 0) {
      return;
    }

    this.props.addFund(this.state.transactionType,
                       this.state.fundType,
                       this.state.amount);
  }

  /** Return Add/Redeem team fund type component.
   * @return {object} component for add/redeem
   */
  render() {
    return (
      <span id='team-fund-add-redeem-container-id'
           className='team-fund-add-redeem-container'>
        <span className='add-redeem-ream-fund-select'>
          <select id='team-fund-action-select-id'
                  value={this.state.value}
                  onChange={
                    (event) => this.handleTransactionType(event.target.value)}
                  >
            <option value=''>Select Operation</option>
            <option value='CREDIT'>Add</option>
            <option value='DEBIT'>Redeem</option>
          </select>
        </span>
        <span className='add-redeem-ream-fund-select'>
          <select id='team-fund-select-type-id'
                  onChange={(event) => this.handleFundType(event.target.value)}
                  value={this.state.value}
                  >
            <option value=''>Select Fund Type</option>
            {
              this.props.fundTypes.map((fund) => (
                <option value={fund.id} key={fund.id}>{fund.type}</option>))
            }
          </select>
        </span>
        <span className='team-fund-amount-container'>
          Amount:
          <input id='team-fund-amount-id'
                 className='team-fund-amount'
                 onChange={
                  (event) => this.handleAmountUpdate(event.target.value)}
                 />
        </span>
        <span className='team-fund-submit-button'>
          <button id='team-fund-cancel-button-id'
                  className='team-fund-button'
                  onClick={(event) => this.props.closePopup()}>
                Cancel
          </button>
          <button id='team-fund-submit-button-id'
                  className='team-fund-button'
                  onClick={() => this.handleClick()}>
                Submit
          </button>
        </span>
      </span>
    );
  }
}

AddRedeemTeamFund.propTypes = {
  fetchFundTypes: propTypes.func.isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
  addFund: propTypes.func.isRequired,
  closePopup: propTypes.func.isRequired,
};
