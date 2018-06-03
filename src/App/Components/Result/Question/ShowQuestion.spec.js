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
              owner=''
              isEditing={false}
              setEditingQuestion={jest.fn()} />);
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
          owner=''
          isEditing={false}
          setEditingQuestion={jest.fn()} />
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
          owner=''
          isEditing={false}
          setEditingQuestion={jest.fn()} />
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
          owner=''
          isEditing={false}
          setEditingQuestion={jest.fn()} />
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
          owner='iAmOwner'
          isEditing={false}
          setEditingQuestion={jest.fn()} />
    );
    expect(wrapper.find(
        '#show-question-assigned-to-input-field-id').length).toEqual(1);
  });

  it('should have edit button', () => {
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={false}
          setEditingQuestion={jest.fn()} />
    );
    expect(wrapper.find(
        '#show-question-edit-button-id').length).toEqual(1);
  });

  it('should dispatch action on click of edit button', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={false}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    wrapper.find('#show-question-edit-button-id').simulate('click');
    expect(mockSetEditingQuestion).toHaveBeenCalledWith();
  });

  it('should disable input fields on isEditing is false', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={false}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-input-field-id')
      .get(0).props.disabled).toEqual(true);

    expect(wrapper.find('#show-question-description-input-field-id')
      .get(0).props.disabled).toEqual(true);

    expect(wrapper.find('#show-question-owner-input-field-id')
      .get(0).props.disabled).toEqual(true);

    expect(wrapper.find('#show-question-assigned-to-input-field-id')
      .get(0).props.disabled).toEqual(true);
  });

  it('should enable input fields on isEditing is true', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={true}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-input-field-id')
      .get(0).props.disabled).toEqual(false);

    expect(wrapper.find('#show-question-description-input-field-id')
      .get(0).props.disabled).toEqual(false);

    expect(wrapper.find('#show-question-owner-input-field-id')
      .get(0).props.disabled).toEqual(false);
    expect(wrapper.find('#show-question-assigned-to-input-field-id')
      .get(0).props.disabled).toEqual(false);
  });

  it('should have button name save if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={true}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-edit-button-id')
      .get(0).props.children).toEqual('Save');
  });

  it('should have button name Edit if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={false}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-edit-button-id')
      .get(0).props.children).toEqual('Edit');
  });
});
