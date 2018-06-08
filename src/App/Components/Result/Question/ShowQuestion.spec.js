/* eslint-disable */
import React from 'react';
import {ShowQuestion} from './ShowQuestion';
/* eslint-enable */
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

const users = [{'userName': 'user1'}, {'userName': 'user2'}];

describe('Show Question component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(
            <ShowQuestion
              question='q'
              description='d'
              assignedTo='at'
              owner=''
              users={users}
              isEditing={false}
              id={10}
              questions={[{id: 2}]}
              setEditingQuestion={()=>{}}
              updateQuestion={()=>{}}/>);

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
          id={10}
          users= {users}
          questions={[]}
          updateQuestion={()=>{}}
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
          id={10}
          users= {users}
          questions={[]}
          updateQuestion={()=>{}}

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
          id={10}
          users= {users}
          isEditing={false}
          questions={[]}
          updateQuestion={()=>{}}
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
          id={10}
          users= {users}
          isEditing={false}
          questions={[]}
          updateQuestion={()=>{}}
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
          id={10}
          users= {users}
          isEditing={false}
          questions={[]}
          updateQuestion={()=>{}}
          setEditingQuestion={jest.fn()} />
    );
    expect(wrapper.find(
        '#show-question-edit-button-id').length).toEqual(1);
  });

  it('should dispatch action on click of edit button', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = mount(
        <ShowQuestion
          question='q1'
          description='d1'
          assignedTo='a1'
          owner='iAmOwner'
          id={10}
          users= {users}
          isEditing={false}
          questions={[]}
          updateQuestion={()=>{}}
          setEditingQuestion={mockSetEditingQuestion} />
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
          question=''
          description=''
          id={10}
          assignedTo=''
          owner='iAmOwner'
          users= {users}
          isEditing={false}
          questions={[]}
          updateQuestion={()=>{}}
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
          users= {users}
          id={10}
          owner='iAmOwner'
          questions={[]}
          updateQuestion={()=>{}}
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

  it('should have button name save if edit is disabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          id={10}
          users= {users}
          questions={[]}
          updateQuestion={()=>{}}
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
          id={10}
          users= {users}
          owner='iAmOwner'
          questions={[]}
          updateQuestion={()=>{}}
          isEditing={false}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-edit-button-id')
      .get(0).props.children).toEqual('Edit');
  });

  it('should show all users for assigned to if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          isEditing={true}
          questions={[]}
          updateQuestion={()=>{}}
          id={10}
          users={users}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-assigned-to-input-field-id')
      .get(0).props.children.length).toEqual(2);
  });

  it('should show all users for owner if edit is enabled', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          id={10}
          questions={[]}
          updateQuestion={()=>{}}
          isEditing={true}
          users={users}
          setEditingQuestion={mockSetEditingQuestion} />
    );
    expect(wrapper.find('#show-question-owner-input-field-id')
      .get(0).props.children.length).toEqual(2);
  });

  it('Component should have required questions properties', () => {
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          id={10}
          isEditing={true}
          questions={[]}
          updateQuestion={()=>{}}
          users={users}
          setEditingQuestion={()=>{}} />
    );
    expect(wrapper.state()).toEqual({
      id: 10,
      question: '',
      description: '',
      owner: 'iAmOwner',
      assignedTo: '',
    });
  });

  it('should not call submit if any field is empty', () => {
    const mockSetEditingQuestion = jest.fn();
    const wrapper = shallow(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='iAmOwner'
          id={10}
          isEditing={true}
          questions={[]}
          updateQuestion={()=>{}}
          users={users}
          setEditingQuestion={mockSetEditingQuestion}/>
    );
    wrapper.find('#show-question-edit-button-id').simulate('submit');
    expect(mockSetEditingQuestion).not.toHaveBeenCalled();
  });

  it('should set question text field', () => {
    const event = {target: {value: 'why oh why?'}};
    const container = mount(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner=''
          id={10}
          isEditing={true}
          questions={[]}
          updateQuestion={()=>{}}
          users={users}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-input-field-id')
      .simulate('change', event);

    container.find('#show-question-input-field-id').simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': '',
       'description': '',
       'id': 10,
       'owner': '',
       'question': 'why oh why?',
    });
  });

  it('should set question description text field', () => {
    const event = {target: {value: 'why oh why?'}};
    const container = mount(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner=''
          questions={[]}
          updateQuestion={()=>{}}
          id={10}
          isEditing={true}
          users={users}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-description-input-field-id')
      .simulate('change', event);

    container.find('#show-question-description-input-field-id')
      .simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': '',
       'description': 'why oh why?',
       'id': 10,
       'owner': '',
       'question': '',
    });
  });

  it('should set question assigned to select field', () => {
    const event = {target: {value: 'user1'}};
    const container = mount(
        <ShowQuestion
          question=''
          description=''
          assignedTo='user2'
          owner=''
          id={10}
          isEditing={true}
          questions={[]}
          updateQuestion={()=>{}}
          users={users}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-assigned-to-input-field-id')
      .simulate('change', event);

    container.find('#show-question-assigned-to-input-field-id')
      .simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': 'user1',
       'description': '',
       'id': 10,
       'owner': '',
       'question': '',
    });
  });

  it('should set question owner select field', () => {
    const event = {target: {value: 'user1'}};
    const container = mount(
        <ShowQuestion
          question=''
          description=''
          assignedTo=''
          owner='user1234'
          questions={[]}
          updateQuestion={()=>{}}
          id={10}
          isEditing={true}
          users={users}
          setEditingQuestion={()=>{}}/>
    );
    container.find('#show-question-owner-input-field-id')
      .simulate('change', event);

    container.find('#show-question-owner-input-field-id').simulate('submit');
    expect(container.state()).toEqual({
       'assignedTo': '',
       'description': '',
       'id': 10,
       'owner': 'user1',
       'question': '',
    });
  });

    it('should dispatch add question on submit', () => {
      const mockUpdateQuestion = jest.fn();
      const questions = [{id: 2}, {id: 3}];
      const container = mount(
          <ShowQuestion
            question='q1'
            description='d1'
            assignedTo='a1'
            owner='o1'
            id={10}
            isEditing={true}
            users={users}
            questions={questions}
            updateQuestion={mockUpdateQuestion}
            setEditingQuestion={()=>{}}
            />
      );

      container.find('#show-question-edit-button-id').simulate('submit');
      const expQuestion = {
          question: 'q1',
          description: 'd1',
          assignedTo: 'a1',
          owner: 'o1',
          id: 10,
      };
      expect(mockUpdateQuestion).toHaveBeenCalledWith(questions, expQuestion);
    });

    it('should not dispatch add question on submit if editing is false', () => {
      const mockUpdateQuestion = jest.fn();
      const questions = [{id: 2}, {id: 3}];
      const container = mount(
          <ShowQuestion
            question='q1'
            description='d1'
            assignedTo='a1'
            owner='o1'
            id={10}
            isEditing={false}
            users={users}
            questions={questions}
            setEditingQuestion={()=>{}}
            updateQuestion={mockUpdateQuestion}
            />
      );

      container.find('#show-question-edit-button-id').simulate('submit');

      expect(mockUpdateQuestion).not.toHaveBeenCalled();
    });
});
