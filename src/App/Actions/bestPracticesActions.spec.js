import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {PracticesService} from '../Services/BestPracticesService';
import {getBestPractices, getPracticesAssessment, savePracticeAssessment} from './bestPracticesActions';

describe('should create best practices actions', () => {
  let store;
  beforeEach(() => {
    const middleware = [thunk];
    store = configureStore(middleware)({});
    store.clearActions();
  });

  it('should dispatch fetch best practice action', async () => {
    const bestPractices = [{id: 1011}, {id: 1012}];
    spyOn(PracticesService, 'getPractices').and.returnValues(bestPractices);

    await store.dispatch(getBestPractices());

    expect(PracticesService.getPractices).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_BEST_PRACTICES_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: [
          {
            id: 1011,
          },
          {
            id: 1012,
          },
        ],
        type: 'ADD_BEST_PRACTICES',
      },
      {
        payload: 'GET_BEST_PRACTICES_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('Should show error message if failed to get best practices', async () => {
    spyOn(PracticesService, 'getPractices').and.throwError('failed');
    await store.dispatch(getBestPractices());
    expect(PracticesService.getPractices).toHaveBeenCalledWith();
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_BEST_PRACTICES_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_BEST_PRACTICES_NOTIFICATION_ID',
          type: 'ERROR',
          message: 'Unable to fetch best practices. Please try after sometime.',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_BEST_PRACTICES_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('should dispatch save best practice action', async () => {
    const bestPractices = [{bestPracticeId: 1011}, {bestPracticeId: 1012}];
    spyOn(PracticesService, 'saveBestPracticesAssessments').and.returnValues(bestPractices);
    const retroId = 100;
    await store.dispatch(savePracticeAssessment(retroId, bestPractices));

    expect(PracticesService.saveBestPracticesAssessments).toHaveBeenCalledWith(retroId, bestPractices);
    expect(store.getActions()).toEqual([{
      payload: 'SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID',
      type: 'SHOW_LOADER',
    }, {
      payload: 'SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID',
      type: 'HIDE_LOADER',
    }]);
  });

  it('Should show error message if failed to get best practices', async () => {
    spyOn(PracticesService, 'saveBestPracticesAssessments').and.throwError('failed');
    const retroId = 100;
    const bestPractices = [{bestPracticeId: 1011}, {bestPracticeId: 1012}];
    await store.dispatch(savePracticeAssessment(retroId, bestPractices));
    expect(PracticesService.saveBestPracticesAssessments).toHaveBeenCalledWith(retroId, bestPractices);
    expect(store.getActions()).toEqual([
      {
        payload: 'SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'SAVE_BEST_PRACTICES_ASSESSMENTS_NOTIFICATION_ID',
          type: 'ERROR',
          message: 'Unable to save best practices assessments. Please try after sometime.',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'SAVE_BEST_PRACTICES_ASSESSMENTS_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });

  it('should dispatch save practices assessment action', async () => {
    const practicesAssessment = [{bestPracticeId: 1011, answer: true}, {bestPracticeId: 1012, answer: false}];
    spyOn(PracticesService, 'getBestPracticesAssessment').and.returnValues(practicesAssessment);
    const retroId = 100;
    await store.dispatch(getPracticesAssessment(retroId));

    expect(PracticesService.getBestPracticesAssessment).toHaveBeenCalledWith(retroId);
    expect(store.getActions()).toEqual([{
      payload: 'GET_PRACTICES_ASSESSMENT_LOADER_ID',
      type: 'SHOW_LOADER',
    }, {
      payload: practicesAssessment,
      type: 'ADD_PRACTICES_ASSESSMENT',
    }, {
      payload: 'GET_PRACTICES_ASSESSMENT_LOADER_ID',
      type: 'HIDE_LOADER',
    }]);
  });

  it('Should show error message if failed to practices assessment', async () => {
    spyOn(PracticesService, 'getBestPracticesAssessment').and.returnValue(Promise.reject({response: {status: 500}}));
    const retroId = 100;
    await store.dispatch(getPracticesAssessment(retroId));
    expect(PracticesService.getBestPracticesAssessment).toHaveBeenCalledWith(retroId);
    expect(store.getActions()).toEqual([
      {
        payload: 'GET_PRACTICES_ASSESSMENT_LOADER_ID',
        type: 'SHOW_LOADER',
      },
      {
        payload: {
          id: 'GET_PRACTICES_ASSESSMENT_NOTIFICATION_ID',
          type: 'ERROR',
          message: 'Unable to fetch practices assessments. Please try after sometime.',
        },
        type: 'SHOW_NOTIFICATION',
      },
      {
        payload: 'GET_PRACTICES_ASSESSMENT_LOADER_ID',
        type: 'HIDE_LOADER',
      },
    ]);
  });
});
