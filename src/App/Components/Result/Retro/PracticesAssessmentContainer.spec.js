/* eslint-disable */
import React from 'react';
/* eslint-enable */
import {mapDispatchToProps, mapStateToProps} from './PracticesAssessmentContainer';
import * as PracticesAction from '../../../Actions/bestPracticesActions';


describe('Practice Assessments Container', () => {
  it('should map practice assessments', () => {
    const state = {retro: {practices: [{id: 1023}]}};
    const props = mapStateToProps(state);
    expect(props.practices).toEqual(state.retro.practices);
  });

  it('should call fetch practices', () => {
    const action = {type: 'action', payload: 'payload'};
    spyOn(PracticesAction, 'getBestPractices').and.returnValue(action);
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchPractices();

    expect(PracticesAction.getBestPractices).toHaveBeenCalledWith();
    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should call save practices', () => {
    const action = {type: 'action', payload: 'payload'};
    spyOn(PracticesAction, 'savePracticeAssessment').and.returnValue(action);
    const dispatch = jest.fn();
    const retroId = 10293;
    const bestPractices = [{id: 534}];
    mapDispatchToProps(dispatch).savePracticeAssessment(retroId, bestPractices);

    expect(PracticesAction.savePracticeAssessment).toHaveBeenCalledWith(retroId, bestPractices);
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
