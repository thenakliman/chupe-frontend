import {PracticesService} from '../Services/BestPracticesService';
import {ActionTypes} from './ActionTypes';
import {hideLoader, showLoader} from './loaderActions';
import {showNotificationFromObject} from './notificationActions';

import {
  GET_BEST_PRACTICES_LOADER_ID,
  GET_BEST_PRACTICES_NOTIFICATION,
  GET_PRACTICES_ASSESSMENT_LOADER_ID,
  GET_PRACTICES_ASSESSMENT_NOTIFICATION,
  SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID,
  SAVE_BEST_PRACTICES_ASSESSMENTS_NOTIFICATION,
} from '../Components/Result/Common/constants';


const addBestPractices = (bestPractices) => ({
  type: ActionTypes.ADD_BEST_PRACTICES,
  payload: bestPractices,
});

const addPracticesAssessment = (practicesAssessment) => ({
  type: ActionTypes.ADD_PRACTICES_ASSESSMENT,
  payload: practicesAssessment,
});

export const getBestPractices = () => async (dispatch) => {
  dispatch(showLoader(GET_BEST_PRACTICES_LOADER_ID));
  try {
    const bestPractices = await PracticesService.getPractices();
    dispatch(addBestPractices(bestPractices));
  } catch (error) {
    dispatch(showNotificationFromObject(GET_BEST_PRACTICES_NOTIFICATION));
  }
  dispatch(hideLoader(GET_BEST_PRACTICES_LOADER_ID));
};

export const getPracticesAssessment = (retroId) => async (dispatch) => {
  dispatch(showLoader(GET_PRACTICES_ASSESSMENT_LOADER_ID));
  try {
    const practicesAssessment = await PracticesService.getBestPracticesAssessment(retroId);
    dispatch(addPracticesAssessment(practicesAssessment));
  } catch (error) {
    dispatch(showNotificationFromObject(GET_PRACTICES_ASSESSMENT_NOTIFICATION));
  }
  dispatch(hideLoader(GET_PRACTICES_ASSESSMENT_LOADER_ID));
};

export const savePracticeAssessment = (retroId, practicesAssessments) => async (dispatch) => {
  dispatch(showLoader(SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID));
  try {
    await PracticesService.saveBestPracticesAssessments(retroId, practicesAssessments);
  } catch (error) {
    dispatch(showNotificationFromObject(SAVE_BEST_PRACTICES_ASSESSMENTS_NOTIFICATION));
  }
  dispatch(hideLoader(SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID));
};
