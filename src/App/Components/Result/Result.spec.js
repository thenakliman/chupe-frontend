import React from 'react'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import {Result} from './Result';// eslint-disable-line no-unused-vars
import {RESULT_COMPONENTS} from './../constants';

describe('updates result correctly on click', () => {
  it('User component is displayed if view is invalid', () => {
        const view = 'invalid';
        const wrapper = shallow(<Result view={view} />);
        expect(
            wrapper.find('#user-result-container')
                .get(0)
                .props
                .id
        ).toEqual('user-result-container');
  });

  it('Question component is displayed if view is QUESTION_COMPONENT', () => {
        const view = RESULT_COMPONENTS.QUESTION_COMPONENT;
        const wrapper = shallow(<Result view={view}/>);
        expect(
            wrapper.find('#question-result-container')
                .get(0)
                .props
                .id
        ).toEqual('question-result-container');
  });

  it('User component is displayed if view is USER_COMPONENT', () => {
        const view = RESULT_COMPONENTS.USER_COMPONENT;
        const wrapper = shallow(<Result view={view}/>);
        expect(wrapper.find('#user-result-container')
            .get(0)
            .props
            .id
        ).toEqual('user-result-container');
  });
});
