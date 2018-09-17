import {TeamFund} from './TeamFund';
import {connect} from 'react-redux';
import {
  fetchTeamFund,
  fetchFundTypes,
  addFund,
} from '../../../Actions/teamFundActions';


const mapStateToProps = (state) => ({
  teamFund: state.fund.teamFunds,
  fundTypes: state.fund.fundTypes,
  loggedInUser: state.loggedInUserDetails.userName,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamFund: () => dispatch(fetchTeamFund()),
  fetchFundTypes: () => dispatch(fetchFundTypes()),
  addFund: (fund) => dispatch(addFund(fund)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamFund);
