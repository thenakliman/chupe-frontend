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
      <div id='user-fund-container-id'>
        {this.props.funds.map((fund) => (<div key={fund.id}> {fund.id}</div>))}
      </div>
    );
  }
}

ShowFund.propTypes = {
  fetchFunds: PropTypes.func.isRequired,
  funds: PropTypes.array,
};
