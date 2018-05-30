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

  it('ASK Question component is displayed for ask question', () => {
        const view = RESULT_COMPONENTS.ASK_QUESTION_COMPONENT;
        const wrapper = shallow(<Result view={view}/>);
        expect(wrapper.find('#ask-question-result-container').length)
            .toEqual(1);
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

  it('Question component is displayed for QUESTION', () => {
        const view = RESULT_COMPONENTS.QUESTION_COMPONENT;
        const wrapper = shallow(<Result view={view}/>);
        expect(wrapper.find('#list-question-result-container').length)
            .toEqual(1);
  });

  it('Question component is displayed for show QUESTION', () => {
      const wrapper = shallow(
          <Result
          view={RESULT_COMPONENTS.SHOW_QUESTION_COMPONENT}/>
      );

      expect(wrapper.find('#show-question-result-container').length)
          .toEqual(1);
  });
});
