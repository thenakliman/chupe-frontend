/* eslint-disable */
import React from 'react';
/* eslint-enable */
import {mount, shallow} from 'enzyme';
import {PracticesAssessment} from "./PracticesAssessment";
import toJson from 'enzyme-to-json';

describe('practices assessments', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<PracticesAssessment fetchPractices={jest.fn()}
                                                 savePracticeAssessment={jest.fn()}
                                                 practices={[{id: 1010, description: "some practices"}]}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should fetch assessments on mount', () => {
    const fetchPractices = jest.fn();
    shallow(<PracticesAssessment fetchPractices={fetchPractices}
                                 savePracticeAssessment={jest.fn()}
                                 practices={[{id: 1010, description: "some practices"}]}/>);

    expect(fetchPractices).toHaveBeenCalledWith();
  });

  it('should change state as per answer for a practice', async () => {
    const fetchPractices = jest.fn();
    const practices = [{
      id: 1010, description: "some practices - 1"
    }, {
      id: 1012, description: "some practices - 2"
    }];

    const wrapper = mount(<PracticesAssessment fetchPractices={fetchPractices}
                                               savePracticeAssessment={jest.fn()}
                                               practices={practices}/>);
    await wrapper.find('#no-0').simulate('change');

    expect(wrapper.state().assessments).toEqual([{bestPracticeId: 1010, answer: false}, {
      bestPracticeId: 1012,
      answer: true
    }]);
  });

  it('should save assessment on click of save', () => {
    const savePracticeAssessment = jest.fn(() => Promise.resolve());
    const practices = [{
      id: 1010, description: "some practices - 1"
    }, {
      id: 1012, description: "some practices - 2"
    }];

    const params = {params: {id: 1}};
    const wrapper = shallow(<PracticesAssessment fetchPractices={jest.fn()}
                                                 savePracticeAssessment={savePracticeAssessment}
                                                 match={params}
                                                 practices={practices}/>);
    const assessments = [{bestPracticeId: 1010, answer: false}, {bestPracticeId: 1012, answer: true}];
    wrapper.setState({assessments: assessments});

    wrapper.find('button').simulate('click');
    expect(savePracticeAssessment).toHaveBeenCalledWith(1, assessments);
  });
});