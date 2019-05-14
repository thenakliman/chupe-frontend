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
      fundType: '',
      amount: 0,
    };

    this.handleAmountUpdate = this.handleAmountUpdate.bind(this);
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
   * @param {string} typeId
   */
  handleFundType(typeId) {
    const fund = this.props.fundTypes.find((fund) => fund.id == typeId);
    const defaultAmount = fund && fund.defaultAmount || 0;
    this.setState({fundType: typeId, amount: defaultAmount});
  }
  /** Handle submit event of button. */
  handleClick() {
    if (this.state.amount === 0) {
      return;
    }

    this.props.addFund(this.state.fundType, this.state.amount);
  }

  /** Return Add/Redeem team fund type component.
   * @return {object} component for add/redeem
   */
  render() {
    return (
      <div className={'team-fund-popup-container'}>
      <div id='team-fund-add-redeem-container-id'
           className='team-fund-add-redeem-container'>
        <div className='add-redeem-team-fund-select'>
          <select id='team-fund-select-type-id'
                  onChange={(event) => this.handleFundType(event.target.value)}
                  value={this.state.value}
                  >
            <option value=''>Select Fund Type</option>
            {
              this.props.fundTypes.map((fund) => (
                <option value={fund.id}
                        key={fund.id}>
                            {fund.description}
                </option>))
            }
          </select>
        </div>
        <div className='team-fund-amount-container'>
          Amount:
          <input id='team-fund-amount-id'
                 className='team-fund-amount'
                 value={this.state.amount}
                 onChange={
                  (event) => this.handleAmountUpdate(event.target.value)}
                 />
        </div>
        <div className='team-fund-submit-button'>
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
        </div>
      </div>
    </div>
    );
  }
}

AddRedeemTeamFund.propTypes = {
  fetchFundTypes: propTypes.func.isRequired,
  fundTypes: propTypes.arrayOf(propTypes.object).isRequired,
  addFund: propTypes.func.isRequired,
  closePopup: propTypes.func.isRequired,
};
