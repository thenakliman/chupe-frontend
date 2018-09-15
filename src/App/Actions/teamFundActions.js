import {ActionTypes} from './ActionTypes';
import {TeamFundService} from '../Services/TeamFundService';

const DEFAULT_FUND_TYPE = 'Unknown';

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

/** Action creator for adding funds for a member.
 * @param {object} memberFunds for a user
 * @return {object} action
 */
function addFundForAUser(memberFunds) {
 return {
    type: ActionTypes.ADD_FUNDS_FOR_USER,
    payload: memberFunds,
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

/** Add fundTypes description to funds
 * @param {array} funds to which fund type description to be added
 * @param {array} fundTypes to which fund type description to be added
 * @returns {array} funds with updated description
 */
function addDescriptionToFundType(funds, fundTypes) {
  const fundTypeIdToDescription = {};
  fundTypes.map((fund) => fundTypeIdToDescription[fund.id] = fund.description);
  const updatedFund = [];
  funds.map((fund) =>
    updatedFund.push(
      Object.assign(
        {},
        fund,
        {type: fundTypeIdToDescription[fund.type]?
               fundTypeIdToDescription[fund.type]:
               DEFAULT_FUND_TYPE
        }
      )
    )
  );

  return updatedFund;
}
/** Fetch fund for user.
 * @param {string} owner for which funds has to be fetched
 * @return {func} thunk
 */
export const fetchFundsForAUser = (owner) => async (dispatch) => {
  try {
    const [funds, fundTypes] = (await Promise.all([
        TeamFundService.getFundsForAUser(owner),
        TeamFundService.fetchFundTypes(),
      ]));

    dispatch(addFundForAUser(addDescriptionToFundType(funds, fundTypes)));
  } catch (error) {
    console.log('Error in fetching fund for a member');
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
