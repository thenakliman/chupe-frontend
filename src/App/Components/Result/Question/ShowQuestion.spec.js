/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

const questions = [{
    question: 'question1',
    id: 1,
    description: 'test-description1',
    owner: 'owner-1',
    assignedTo: 'assigned-1',
  },
  {
    question: 'question2',
    id: 2,
    description: 'test-description2',
    owner: 'owner-2',
    assignedTo: 'assigned-2',
  }];

const users = [{'userName': 'user1'}, {'userName': 'user2'}];

describe('Show Question component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <ShowQuestion
              users={users}
              isEditing={false}
              questions={questions}
              setEditingQuestion={()=>{}}
              updateQuestion={()=>{}}
              match={{params: {id: 2}}}
        />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});


describe('Show question component', () => {
  it('should have question input field', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={false}
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()}
          match={{params: {id: 2}}}
        />
    );

    expect(wrapper.find(
        '#show-question-input-field-id').length).toEqual(1);
  });

  it('should have question description', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={false}
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          match={{params: {id: 2}}}
          setEditingQuestion={jest.fn()} />
    );
    expect(wrapper.find(
        '#show-question-description-input-field-id').length).toEqual(1);
  });

  it('should have assigned to select field', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          isEditing={false}
          questions={questions}
          updateQuestion={()=>{}}
          match={{params: {id: 2}}}
          setEditingQuestion={jest.fn()} />
    );
    expect(wrapper.find(
        '#show-question-assigned-to-input-field-id').length).toEqual(1);
  });

  it('should have owner select field', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          isEditing={false}
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()}
          match={{params: {id: 2}}}
        />
    );
    expect(wrapper.find(
        '#show-question-assigned-to-input-field-id').length).toEqual(1);
  });

  it('should have edit button', () => {
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          isEditing={false}
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()}
          match={{params: {id: 2}}}
        />
    );
    expect(wrapper.find(
        '#show-question-edit-button-id').length).toEqual(1);
  });

  it('should dispatch action on click of edit button', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = mount(
        <ShowQuestion
          users= {users}
          isEditing={false}id
          questions={questions}
          updateQuestion={()=>{}}
          setEditingQuestion={mockSetEditingQuestion}
          match={{params: {id: 2}}}
        />
    );
    wrapper.find('#show-question-edit-button-id').simulate('submit');
    expect(wrapper.find('#show-question-edit-button-id').get(0).props.children)
      .toEqual('Edit');
    expect(mockSetEditingQuestion).toHaveBeenCalledWith(true);
  });

  it('should disable input fields on isEditing is false', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          isEditing={false}
          questions={questions}
          updateQuestion={()=>{}}
          match={{params: {id: 2}}}
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
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          isEditing={true}
          match={{params: {id: 2}}}
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

  it('should have button name save if edit is disabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          isEditing={true}
          match={{params: {id: 2}}}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-edit-button-id')
      .get(0).props.children).toEqual('Save');
  });

  it('should have button name Edit if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          users= {users}
          questions={questions}
          updateQuestion={()=>{}}
          isEditing={false}
          match={{params: {id: 2}}}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-edit-button-id')
      .get(0).props.children).toEqual('Edit');
  });

  it('should show all users for assigned to if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-assigned-to-input-field-id')
      .get(0).props.children.length).toEqual(2); questions;
  });

  it('should show all users for owner if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          questions={questions}
          updateQuestion={()=>{}}
          isEditing={true}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-owner-input-field-id')
      .get(0).props.children.length).toEqual(2);
  });

  it('Component should have required questions properties', () => {
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}} />
    );
    expect(wrapper.state()).toEqual({
      id: 2,
      question: 'question2',
      description: 'test-description2',
      owner: 'owner-2',
      assignedTo: 'assigned-2',
    });
  });

  it('should not call submit if any field is empty', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={mockSetEditingQuestion}/>
    );
    wrapper.find('#show-question-edit-button-id').simulate('submit');
    expect(mockSetEditingQuestion).not.toHaveBeenCalled();
  });

  it('should set question text field', () => {
    const event = {target: {value: 'why oh why?'}};
    const container = mount(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-input-field-id')
      .simulate('change', event);

    container.find('#show-question-input-field-id').simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': 'assigned-2',
       'description': 'test-description2',
       'id': 2,
       'owner': 'owner-2',
       'question': event.target.value,
    });
  });

  it('should set question description text field', () => {
    const event = {target: {value: 'why oh why?'}};
    const container = mount(
        <ShowQuestion
          questions={questions}
          updateQuestion={()=>{}}
          isEditing={true}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-description-input-field-id')
      .simulate('change', event);

    container.find('#show-question-description-input-field-id')
      .simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': 'assigned-2',
       'description': event.target.value,
       'id': 2,
       'owner': 'owner-2',
       'question': 'question2',
    });
  });

  it('should set question assigned to select field', () => {
    const event = {target: {value: 'user1'}};
    const container = mount(
        <ShowQuestion
          isEditing={true}
          questions={questions}
          updateQuestion={()=>{}}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-assigned-to-input-field-id')
      .simulate('change', event);

    container.find('#show-question-assigned-to-input-field-id')
      .simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': event.target.value,
       'description': 'test-description2',
       'id': 2,
       'owner': 'owner-2',
       'question': 'question2',
    });
  });

  it('should set question owner select field', () => {
    const event = {target: {value: 'user1'}};
    const container = mount(
        <ShowQuestion
          questions={questions}
          updateQuestion={()=>{}}
          isEditing={true}
          users={users}
          match={{params: {id: 2}}}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-owner-input-field-id')
      .simulate('change', event);

    container.find('#show-question-owner-input-field-id').simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': 'assigned-2',
       'description': 'test-description2',
       'id': 2,
       'owner': event.target.value,
       'question': 'question2',
    });
  });

    it('should dispatch add question on submit', () => {
      const mockUpdateQuestion = jest.fn();
      const container = mount(
          <ShowQuestion
            isEditing={true}
            users={users}
            match={{params: {id: 2}}}
            questions={questions}
            updateQuestion={mockUpdateQuestion}
            setEditingQuestion={()=>{}}
            />
      );

      container.find('#show-question-edit-button-id').simulate('submit');
      const expQuestion = {
          question: 'question2',
          description: 'test-description2',
          assignedTo: 'assigned-2',
          owner: 'owner-2',
          id: 2,
      };
      expect(mockUpdateQuestion).toHaveBeenCalledWith(questions, expQuestion);
    });

    it('should not dispatch add question on submit if editing is false', () => {
      const mockUpdateQuestion = jest.fn();
      const container = mount(
          <ShowQuestion
            isEditing={false}
            users={users}
            match={{params: {id: 2}}}
            questions={questions}
            setEditingQuestion={()=>{}}
            updateQuestion={mockUpdateQuestion}
            />
      );

      container.find('#show-question-edit-button-id').simulate('submit');

      expect(mockUpdateQuestion).not.toHaveBeenCalled();
    });

    it('should not dispatch add question if there are empty fields', () => {
      const mockUpdateQuestion = jest.fn();
      const questionWithEmptyFields = [{
          id: 2,
          description: '',
          question: '',
          assignedTo: '',
          owner: ''}];

      const container = mount(
          <ShowQuestion
            isEditing={false}
            users={users}
            match={{params: {id: 2}}}
            questions={questionWithEmptyFields}
            setEditingQuestion={()=>{}}
            updateQuestion={mockUpdateQuestion}
            />
      );

      container.find('#show-question-edit-button-id').simulate('submit');

      expect(mockUpdateQuestion).not.toHaveBeenCalled();
    });
});
