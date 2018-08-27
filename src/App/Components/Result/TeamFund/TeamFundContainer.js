import {TeamFund} from './TeamFund';
import {connect} from 'react-redux';
import {fetchTeamFund, fetchFundTypes} from '../../../Actions/teamFundActions';


const mapStateToProps = (state) => ({
  teamFund: state.teamFund,
  fundTypes: state.fundTypes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTeamFund: () => dispatch(fetchTeamFund()),
  fetchFundTypes: () => dispatch(fetchFundTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamFund);
