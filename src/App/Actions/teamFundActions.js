import {ActionTypes} from './ActionTypes';
import {TeamFundService} from '../Services/TeamFundService';

/** Action creator for adding team fund.
 * @param {object} teamFund list of team member funds
 * @return {object} action
 */
function addTeamFund(teamFund) {
 return {
    type: ActionTypes.ADD_TEAM_FUND,
    payload: teamFund,
  };
};

/** Fetch team fund and add to store.
 * @return {func} return thunk
 */
export const fetchTeamFund = () => async (dispatch) => {
  try {
    const teamFund = await TeamFundService.fetchTeamFund();
    dispatch(addTeamFund(teamFund.teamMemberFunds));
  } catch (error) {
    console.log('Error in fetching team fund');
  }
};
