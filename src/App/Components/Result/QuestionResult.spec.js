import React from 'react';// eslint-disable-line no-unused-vars
import {QuestionResult} from './QuestionResult';
import {shallow, mount} from 'enzyme';

describe('Question result', () => {
    it('Should display input text field', () => {
        const wrapper = shallow(
            <QuestionResult askQuestion={()=>{}} getQuestions={()=>{}}/>);
        expect(
            wrapper.find('#ask-question-input-field')
                .get(0)
                .props
                .id
        ).toEqual('ask-question-input-field');
    });

    it('Should call method on click', () => {
        const askQuestion = jest.fn();
        const container = mount(
            <QuestionResult askQuestion={askQuestion} getQuestions={()=>{}}/>);
        const props = container.find(QuestionResult).props();
        props.askQuestion();
        expect(props.askQuestion).toHaveBeenCalledWith();
    });
    it('Component did mount', () => {
        const getQuestions = jest.fn();
        const askQuestion = jest.fn();
        shallow(<QuestionResult
             getQuestions={getQuestions}
             askQuestion={askQuestion} />);

        expect(getQuestions).toHaveBeenCalledWith();
    });
});
