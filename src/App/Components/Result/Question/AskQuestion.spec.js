import React from 'react';// eslint-disable-line no-unused-vars
import {AskQuestion} from './AskQuestion';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Question Result component snapshot', () => {
    it('should match the snapshot', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <AskQuestion
                getAllUsers={()=>{}}
                askQuestion={()=>{}}
                users={users}
                loggedInUser={'user'}
            />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Question result', () => {
  let initialState;
  const user = 'user';

    beforeEach(() => {
        initialState = {
          question: 'q1',
          description: 'd1',
          priority: 'MEDIUM',
          assignedTo: 'a1',
          owner: user,
        };
    });

    it('Should display input text field', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <AskQuestion
                getAllUsers={()=>{}}
                askQuestion={()=>{}}
                loggedInUser={user}
                users={users} />);
        expect(
            wrapper.find('#ask-question-input-field')
                .get(0)
                .props
                .id
        ).toEqual('ask-question-input-field');
    });

    it('Should call ask method on click', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const askQuestion = jest.fn();
        const container = mount(
            <AskQuestion
                askQuestion={askQuestion}
                getAllUsers={()=>{}}
                loggedInUser={user}
                users={users}
            />);
        const props = container.find(AskQuestion).props();
        props.askQuestion();
        expect(props.askQuestion).toHaveBeenCalledWith();
    });

    it('Component should have required questions properties', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(<AskQuestion
             askQuestion={()=>{}}
             getAllUsers={()=>{}}
             loggedInUser={user}
             users={users} />);

        expect(wrapper.state()).toEqual({
            question: '',
            description: '',
            priority: '',
            assignedTo: '',
        });
    });
    it('should not call submit if any field is empty', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            getAllUsers={()=>{}}
            loggedInUser={user}
            users={users}
        />);
        const state = Object.assign({}, initialState, {question: ''});
        container.setState(state);
        container.find('#ask-question-input-field').simulate('submit');
        expect(askQuestion).not.toHaveBeenCalled();
    });

    it('should set question text field', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const event = {target: {value: 'why oh why?'}};
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            getAllUsers={()=>{}}
            users={users}
            loggedInUser={user}
        />);
        const state = Object.assign({}, initialState, {question: ''});
        container.setState(state);
        container.find('#ask-question-input-field')
            .simulate('change', event);

        container.find('#ask-question-input-field').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith(
            Object.assign({}, initialState, {'question': event.target.value}));
    });

    it('should set text field', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const event = {target: {value: 'Description'}};
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            getAllUsers={()=>{}}
            users={users}
            loggedInUser={user}
        />);
        const state = Object.assign({}, initialState, {description: ''});
        container.setState(state);
        container.find('#question-description-textarea')
            .simulate('change', event);

        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith(
            Object.assign(
                {},
                initialState,
                {'description': event.target.value}));
    });

    it('should select priority field', () => {
        const askQuestion = jest.fn();
        const event = {target: {value: 'user1'}};
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            getAllUsers={()=>{}}
            users={users}
            loggedInUser={user}
        />);
        const state = Object.assign({}, initialState, {priority: ''});
        container.setState(state);
        container.find('#question-priority').simulate('change', event);
        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith(
            Object.assign({}, initialState, {'priority': event.target.value}));
    });

    it('should select assigned to field', () => {
        const askQuestion = jest.fn();
        const event = {target: {value: 'user1234'}};
        const users = [{'userName': 'user1234'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            getAllUsers={()=>{}}
            users={users}
            loggedInUser={user}
        />);
        const state = Object.assign({}, initialState, {assignedTo: ''});
        container.setState(state);
        container.find('#question-assigned-to').simulate('change', event);
        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith(
            Object.assign(
                {},
                initialState,
                {'assignedTo': event.target.value}));
    });

    it('should call getAllUsers on component mount', () => {
        const users = [{'userName': 'user1234'}, {'userName': 'user2'}];
        const getAllUsers = jest.fn();
        mount(<AskQuestion askQuestion={jest.fn()}
                           getAllUsers={getAllUsers}
                           loggedInUser={user}
                           users={users}/>);

        expect(getAllUsers).not.toHaveBeenCalled();
    });

    it('should call getAllUsers on mount when users are not present', () => {
        const getAllUsers = jest.fn();
        mount(<AskQuestion askQuestion={jest.fn()}
                           getAllUsers={getAllUsers}
                           loggedInUser={user}
                           users={[]}/>);

        expect(getAllUsers).toHaveBeenCalledWith();
    });
});
