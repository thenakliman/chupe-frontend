import axios from 'axios';
import {QuestionService} from './QuestionService';
import MockAdapter from 'axios-mock-adapter';


describe('Question Service', () => {
    it('Returns data when get questions is called', (done) => {
        let mock = new MockAdapter(axios);
        const questionData = {
            data: [{'question': 'what?'}, {'question': 'when?'}]};

        mock.onGet('/api/v1/question').reply(200, questionData);

        QuestionService.getQuestions(0, 'any').then((response) => {
            expect(response.data).toEqual(questionData.data);
            done();
        });
    });

    it('Response of getQuestions call fails', async () => {
        let mock = new MockAdapter(axios);
        mock.onGet('/api/v1/question').reply(404);
        spyOn(console, 'log');
        await QuestionService.getQuestions();
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });

    it('Returns when ask questions is called', (done) => {
        let mock = new MockAdapter(axios);
        const questionData = {data: {'question': 'what?'}};

        mock.onPost('/api/v1/question', questionData.data)
            .reply(200, questionData.data);

        QuestionService.askQuestion(questionData.data).then((response) => {
            expect(response.data).toEqual(questionData.data);
            done();
        });
    });

    it('Response of askQuestions call fails', async () => {
        let mock = new MockAdapter(axios);
        const questionData = {data: {'question': 'what?'}};
        mock.onPost('/api/v1/question', questionData.data).reply(404);
        spyOn(console, 'log');
        await QuestionService.askQuestion(questionData.data);
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });

    it('Return 204 when update question is called', (done) => {
        let mock = new MockAdapter(axios);
        const questionData = {data: {question: 'what?', id: 1}};

        mock.onPut('/api/v1/question/1', questionData.data)
            .reply(204);

        QuestionService.updateQuestion(questionData.data).then((response) => {
            expect(response.data).toEqual(undefined);
            expect(response.status).toEqual(204);
            done();
        });
    });
    it('Response of updateQuestions call fails', async () => {
        let mock = new MockAdapter(axios);
        const questionData = {data: {'question': 'what?', 'id': 1}};
        mock.onPut('/api/v1/question/1', questionData.data).reply(500);
        spyOn(console, 'log');
        await QuestionService.updateQuestion(questionData.data);
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 500');
    });
});
