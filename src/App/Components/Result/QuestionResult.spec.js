import React from 'react';// eslint-disable-line no-unused-vars
import {QuestionResult} from './QuestionResult';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Question Result component snapshot', () => {
    it('should match the snapshot', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <QuestionResult
                getQuestions={()=>{}}
                askQuestion={()=>{}}
                users={users}
            />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Question result', () => {
    it('Should display input text field', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(
            <QuestionResult
                askQuestion={()=>{}}
                getQuestions={()=>{}}
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
            <QuestionResult
                askQuestion={askQuestion}
                getQuestions={()=>{}}
                users={users}
            />);
        const props = container.find(QuestionResult).props();
        props.askQuestion();
        expect(props.askQuestion).toHaveBeenCalledWith();
    });

    it('Component did mount', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const getQuestions = jest.fn();
        const askQuestion = jest.fn();
        shallow(<QuestionResult
             getQuestions={getQuestions}
             askQuestion={askQuestion}
             users={users} />);

        expect(getQuestions).toHaveBeenCalledWith();
    });
    it('Component should have required questions properties', () => {
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const wrapper = shallow(<QuestionResult
             getQuestions={()=>{}}
             askQuestion={()=>{}}
             users={users} />);

        expect(wrapper.state()).toEqual({
            question: '',
            description: '',
            owner: '',
            assignedTo: '',
        });
    });
    it('Should call on click of button', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<QuestionResult
            getQuestions={()=>{}}
            askQuestion={askQuestion}
            users={users}
        />);

        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith({
            'assignedTo': '',
            'description': '',
            'owner': '',
            'question': ''});
    });
    it('should set text field', () => {
        const askQuestion = jest.fn();
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const event = {target: {value: 'Description'}};
        const container = mount(<QuestionResult
            getQuestions={()=>{}}
            askQuestion={askQuestion}
            users={users}
        />);
        container.find('#question-description-textarea')
            .simulate('change', event);

        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith({
            'assignedTo': '',
            'description': 'Description',
            'owner': '',
            'question': ''});
    });
    it('should select owner field', () => {
        const askQuestion = jest.fn();
        const event = {target: {value: 'user1'}};
        const users = [{'userName': 'user1'}, {'userName': 'user2'}];
        const container = mount(<QuestionResult
            getQuestions={()=>{}}
            askQuestion={askQuestion}
            users={users}
        />);
        container.find('#question-owner').simulate('change', event);
        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith({
            'assignedTo': '',
            'description': '',
            'owner': 'user1',
            'question': ''});
    });
    it('should select assigned to field', () => {
        const askQuestion = jest.fn();
        const event = {target: {value: 'user1234'}};
        const users = [{'userName': 'user1234'}, {'userName': 'user2'}];
        const container = mount(<QuestionResult
            getQuestions={()=>{}}
            askQuestion={askQuestion}
            users={users}
        />);
        container.find('#question-assigned-to').simulate('change', event);
        container.find('#ask-question-submit-button').simulate('submit');
        expect(askQuestion).toHaveBeenCalledWith({
            'assignedTo': 'user1234',
            'description': '',
            'owner': '',
            'question': ''});
    });
});
