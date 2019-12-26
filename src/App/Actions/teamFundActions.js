import {ActionTypes} from './ActionTypes';
import {TeamFundService} from '../Services/TeamFundService';
import {hideLoader, showLoader} from './loaderActions';
import {showNotification} from './notificationActions';

import {
  ADD_FUND_LOADER_ID,
  ADD_FUND_NOTIFICATION,
  GET_FUND_LOADER_ID,
  GET_FUND_NOTIFICATION,
  GET_FUND_TYPES_LOADER_ID,
  GET_FUND_TYPES_NOTIFICATION,
} from '../Components/Result/Common/constants';

const DEFAULT_FUND_TYPE = 'Unknown';

function addTeamFund(teamFund) {
  return {
    type: ActionTypes.ADD_TEAM_FUND,
    payload: teamFund,
  };
}

function addFundTypes(teamFund) {
  return {
    type: ActionTypes.ADD_TEAM_FUND_TYPES,
    payload: teamFund,
  };
}

function addFundForAUser(memberFunds) {
  return {
    type: ActionTypes.ADD_FUNDS_FOR_USER,
    payload: memberFunds,
  };
}

export const fetchFundTypes = () => async (dispatch) => {
  dispatch(showLoader(GET_FUND_TYPES_LOADER_ID));
  try {
    const teamFundTypes = await TeamFundService.fetchFundTypes();
    dispatch(addFundTypes(teamFundTypes));
  } catch (error) {
    dispatch(showNotification(
        GET_FUND_TYPES_NOTIFICATION.id,
        GET_FUND_TYPES_NOTIFICATION.type,
        GET_FUND_TYPES_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_FUND_TYPES_LOADER_ID));
};

export const fetchTeamFund = () => async (dispatch) => {
  dispatch(showLoader(GET_FUND_LOADER_ID));
  try {
    const teamFund = await TeamFundService.fetchTeamFund();
    dispatch(addTeamFund(teamFund.teamMemberFunds));
  } catch (error) {
    dispatch(showNotification(
        GET_FUND_NOTIFICATION.id,
        GET_FUND_NOTIFICATION.type,
        GET_FUND_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_FUND_LOADER_ID));
};

function addDescriptionToFundType(funds, fundTypes) {
  const fundTypeIdToDescription = {};
  fundTypes.map((fund) => fundTypeIdToDescription[fund.id] = fund.description);
  const updatedFund = [];
  funds.map((fund) =>
      updatedFund.push(
          Object.assign(
              {},
              fund,
              {
                type: fundTypeIdToDescription[fund.type] ?
                    fundTypeIdToDescription[fund.type] :
                    DEFAULT_FUND_TYPE,
              }
          )
      )
  );

  return updatedFund;
}

export const fetchFundsForAUser = (owner) => async (dispatch) => {
  dispatch(showLoader(GET_FUND_LOADER_ID));
  try {
    const [funds, fundTypes] = (await Promise.all([
      TeamFundService.getFundsForAUser(owner),
      TeamFundService.fetchFundTypes(),
    ]));

    dispatch(addFundForAUser(addDescriptionToFundType(funds, fundTypes)));
  } catch (error) {
    dispatch(showNotification(
        GET_FUND_NOTIFICATION.id,
        GET_FUND_NOTIFICATION.type,
        GET_FUND_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(GET_FUND_LOADER_ID));
};

export const addFund = (fund) => async (dispatch) => {
  dispatch(showLoader(ADD_FUND_LOADER_ID));
  try {
    await TeamFundService.addFund(fund);
    dispatch(fetchTeamFund());
  } catch (error) {
    dispatch(showNotification(
        ADD_FUND_NOTIFICATION.id,
        ADD_FUND_NOTIFICATION.type,
        ADD_FUND_NOTIFICATION.message,
    ));
  }
  dispatch(hideLoader(ADD_FUND_LOADER_ID));
};
