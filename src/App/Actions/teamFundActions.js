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

/** Action creator for adding team fund types.
 * @param {object} teamFund types list
 * @return {object} action
 */
function addFundTypes(teamFund) {
 return {
    type: ActionTypes.ADD_TEAM_FUND_TYPES,
    payload: teamFund,
  };
};

/** Fetch team fund and add to store.
 * @return {func} return thunk
 */
export const fetchFundTypes = () => async (dispatch) => {
  try {
    const teamFundTypes = await TeamFundService.fetchFundTypes();
    dispatch(addFundTypes(teamFundTypes));
  } catch (error) {
    console.log('Error in fetching team fund types');
  }
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

/** Fetch add team fund and add new fund to store.
 * @param {object} fund to be added
 * @return {func} return thunk
 */
export const addFund = (fund) => async (dispatch) => {
  try {
    await TeamFundService.addFund(fund);
    // todo(thenakliman): It can be optimize to perform transaction
    // on frontend only
    dispatch(fetchTeamFund());
  } catch (error) {
    console.log('Error in adding fund');
  }
};
