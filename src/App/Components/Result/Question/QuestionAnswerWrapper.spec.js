import {shallow} from 'enzyme';
/* eslint-disable */
import React from 'react';
import {QuestionAnswerWrapper} from './QuestionAnswerWrapper';
/* eslint-enable */

describe('should have a box', () => {
  it('should have box with given id', () => {
    const wrapper = shallow(<QuestionAnswerWrapper/>);
    expect(wrapper.find('#question-answer-wrapper-id').length).toEqual(1);
  });

  it('should have a table with given id', () => {
    expect(shallow(<QuestionAnswerWrapper/>).find('table').length).toEqual(1);
  });

  it('should have a table header with given id', () => {
    expect(shallow(<QuestionAnswerWrapper/>).find('thead').length).toEqual(1);
  });

  it('should have a table body with given id', () => {
    expect(shallow(<QuestionAnswerWrapper/>).find('tbody').length).toEqual(1);
  });

  it('should have an edit text on the right', () => {
    const wrapper = shallow(<QuestionAnswerWrapper headerText='' bodyText=''/>)
        .find('#edit-question-answer-wrapper-id');

    expect(wrapper.length).toEqual(1);
  });

  it('should change text from Edit to Save on click', () => {
    const wrapper = shallow(<QuestionAnswerWrapper headerText='' bodyText=''/>);
    expect(
      wrapper.find('#edit-question-answer-wrapper-id')
        .get(0).props.children).toEqual('Edit');

    wrapper.find('#edit-question-answer-wrapper-id').simulate('click');

    expect(
      wrapper.find('#edit-question-answer-wrapper-id')
        .get(0).props.children).toEqual('Save');
  });

  it('should show text area if clicked on edit button', () => {
    const wrapper = shallow(<QuestionAnswerWrapper headerText='' bodyText=''/>);
    wrapper.find('#edit-question-answer-wrapper-id').simulate('click');
    const event = {target: {value: 'test value'}};
    wrapper.find('#question-answer-wrapper-table-textarea-id')
      .simulate('change', event);

    expect(
      wrapper.find('#question-answer-wrapper-table-textarea-id').length
    ).toEqual(1);
  });

  it('should show have initial text as per bodyText', () => {
    const bodyText = 'body text';
    const wrapper = shallow(
      <QuestionAnswerWrapper headerText='' bodyText={bodyText}/>);

    expect(
      wrapper.find('#question-answer-wrapper-table-body-id')
        .get(0).props.children).toEqual(bodyText);
  });

  it('should save data to text area on click of save', () => {
    const wrapper = shallow(
      <QuestionAnswerWrapper headerText='' bodyText=''/>);

    const bodyText = 'test value';
    wrapper.setState({isEditingHeader: true, bodyText: 'body text'});
    const event = {target: {value: bodyText}};
    wrapper.find('#question-answer-wrapper-table-textarea-id')
      .simulate('change', event);

    wrapper.find('#edit-question-answer-wrapper-id').simulate('click');
    expect(
      wrapper.find('#question-answer-wrapper-table-body-id')
        .get(0).props.children).toEqual(bodyText);
  });

  it('should show text in header of table from props', () => {
    const headerText = 'my-header';
    const wrapper = shallow(<QuestionAnswerWrapper headerText={headerText}/>);
    expect(
      wrapper.find('#question-answer-wrapper-table-header-text-id')
        .get(0).props.children
    ).toEqual(headerText);
  });

  it('should show text in body of table from props', () => {
    const bodyText = 'my-body';
    const wrapper = shallow(<QuestionAnswerWrapper bodyText={bodyText}/>);
    expect(
      wrapper.find('#question-answer-wrapper-table-body-id')
        .get(0).props.children
    ).toEqual(bodyText);
  });
});
