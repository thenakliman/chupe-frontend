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

  it('should not have an answer button if not editing', () => {
    const wrapper = shallow(
      <QuestionAnswerWrapper headerText=''
                             bodyText=''
                             isEditing={false}/>
      ).find('#question-answer-wrapper-save-button-id');

    expect(wrapper.length).toEqual(0);
  });

  it('should have an answer button if editing', () => {
    const wrapper = shallow(
        <QuestionAnswerWrapper
          headerText=''
          bodyText=''
          isEditing={true}
        />).find('#question-answer-wrapper-save-button-id');

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
      <QuestionAnswerWrapper headerText='' bodyText='' saveHandler={()=>{}}/>);

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

  it('should call update method on clicked in editing mode', () => {
    const bodyText = 'my-body';
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText={bodyText}
            saveHandler={mockedSaveHandler}
        />);
    wrapper.setState({isEditingHeader: true});
    wrapper.find('#edit-question-answer-wrapper-id').simulate('click');
    expect(mockedSaveHandler).toHaveBeenCalledWith(bodyText);
  });

  it('should call update method on clicked of reply button', () => {
    const bodyText = 'my-body';
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText={bodyText}
            isEditing={true}
            saveHandler={mockedSaveHandler}
        />);
    wrapper.find('#question-answer-wrapper-save-button-id').simulate('click');
    expect(mockedSaveHandler).toHaveBeenCalledWith(bodyText);
  });

  it('should not change editing mode on click of last reply button', () => {
    const bodyText = 'my-body';
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText={bodyText}
            isEditing={true}
            saveHandler={mockedSaveHandler}
        />);
    wrapper.find('#question-answer-wrapper-save-button-id').simulate('click');
    expect(mockedSaveHandler).toHaveBeenCalledWith(bodyText);
  });

  it('should remove text content on click of last reply button', () => {
    const bodyText = 'my-body';
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText={bodyText}
            isEditing={true}
            saveHandler={mockedSaveHandler}
        />);
    wrapper.find('#question-answer-wrapper-save-button-id').simulate('click');
    expect(
      wrapper.find(
        '#question-answer-wrapper-table-textarea-id')
      .get(0).props.value).toEqual('');
  });

  it('should not call update method on click, if not in editing mode', () => {
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText='my-body'
            saveHandler={mockedSaveHandler}
        />);
    wrapper.find('#edit-question-answer-wrapper-id').simulate('click');
    expect(mockedSaveHandler).not.toHaveBeenCalled();
  });

  it('should set initial value of set editing mode from props', () => {
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText='my-body'
            saveHandler={mockedSaveHandler}
            isEditing={true}
        />);
    expect(wrapper.state().isEditingHeader).toEqual(true);
  });

  it('should set default value of isEditing to false', () => {
    const mockedSaveHandler = jest.fn();
    const wrapper = shallow(
        <QuestionAnswerWrapper
            headerText='abc'
            bodyText='my-body'
            saveHandler={mockedSaveHandler}
        />);
    expect(wrapper.state().isEditingHeader).toEqual(false);
  });
});
