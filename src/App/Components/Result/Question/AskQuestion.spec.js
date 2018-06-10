import React from 'react';// eslint-disable-line no-unused-vars
import {AskQuestion} from './AskQuestion';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as History from '../../../utils/history';

describe('Question Result component snapshot', () => {
    it('should match the snapshot', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <AskQuestion
                askQuestion={()=>{}}
                users={users}
            />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Question result', () => {
  let initialState;

    beforeEach(() => {
        initialState = {
          question: 'q1',
          description: 'd1',
          owner: 'o1',
          assignedTo: 'a1',
        };
    });

    it('Should display input text field', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <AskQuestion
                askQuestion={()=>{}}
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
             users={users} />);

        expect(wrapper.state()).toEqual({
            question: '',
            description: '',
            owner: '',
            assignedTo: '',
        });
    });
    it('should not call submit if any field is empty', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
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
            users={users}
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
        History.history = {push: jest.fn()};
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const event = {target: {value: 'Description'}};
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            users={users}
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
        expect(History.history.push).toHaveBeenCalledWith('/questions');
    });

    it('should select owner field', () => {
        const askQuestion = jest.fn();
        History.history = {push: jest.fn()};
        const event = {target: {value: 'user1'}};
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            users={users}
        />);
        const state = Object.assign({}, initialState, {owner: ''});
        container.setState(state);
        container.find('#question-owner').simulate('change', event);
        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith(
            Object.assign({}, initialState, {'owner': event.target.value}));
        expect(History.history.push).toHaveBeenCalledWith('/questions');
    });

    it('should select assigned to field', () => {
        const askQuestion = jest.fn();
        History.history = {push: jest.fn()};
        const event = {target: {value: 'user1234'}};
        const users = [{'userName': 'user1234'}, {'userName': 'user2'}];
        const container = mount(<AskQuestion
            askQuestion={askQuestion}
            users={users}
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
        expect(History.history.push).toHaveBeenCalledWith('/questions');
    });
});
