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

  it('should show text in header of table from props', () => {
    const headerText = 'my-header';
    const wrapper = shallow(<QuestionAnswerWrapper headerText={headerText}/>);
    expect(
      wrapper.find('#question-answer-wrapper-table-header-id')
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
