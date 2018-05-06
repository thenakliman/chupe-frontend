import React from 'react';// eslint-disable-line no-unused-vars
import {QuestionResult} from './QuestionResult';
import {shallow, mount} from 'enzyme';

describe('Question result', () => {
    it('Should display input text field', () => {
        const wrapper = shallow(<QuestionResult askQuestion={()=>{}} />);
        expect(
            wrapper.find('#ask-question-input-field')
                .get(0)
                .props
                .id
        ).toEqual('ask-question-input-field');
    });

    it('Should call method on click', () => {
        const askQuestion = jest.fn();
        const container = mount(<QuestionResult askQuestion={askQuestion}/>);
        const props = container.find(QuestionResult).props();
        props.askQuestion();
        expect(props.askQuestion).toHaveBeenCalledWith();
    });
});
