import {ShowFund} from './ShowFund';
import * as fundAction from '../../../Actions/teamFundActions';
import {connect} from 'react-redux';

export const mapStateToProps = (state) => ({
  funds: state.funds,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchFunds: (owner) => dispatch(fundAction.fetchFundsForAUser(owner)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowFund);
