/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Show Question component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <ShowQuestion
              question='q'
              description='d'
              assignedTo='at'
              owner=''/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});


describe('Show question component', () => {
  it('should have question input field', () => {
    const wrapper = shallow(
        <ShowQuestion
          question='my-question'
          description=''
          assignedTo=''
          owner=''/>
    );

    expect(wrapper.find(
        '#show-question-input-field-id').length).toEqual(1);
  });

  it('should have question description', () => {
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description='question description'
          assignedTo=''
          owner=''/>
    );
    expect(wrapper.find(
        '#show-question-description-input-field-id').length).toEqual(1);
  });

  it('should have assigned to select field', () => {
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo='Lucky Bond'
          owner=''/>
    );
    expect(wrapper.find(
        '#show-question-assigned-to-input-field-id').length).toEqual(1);
  });

  it('should have owner select field', () => {
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'/>
    );
    expect(wrapper.find(
        '#show-question-assigned-to-input-field-id').length).toEqual(1);
  });
});
