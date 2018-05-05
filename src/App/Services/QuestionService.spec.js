import axios from 'axios';
import {QuestionService} from './QuestionService';
import MockAdapter from 'axios-mock-adapter';


describe('Question Service', () => {
    it('Returns data when get questions is called', (done) => {
        let mock = new MockAdapter(axios);
        const questionData = {
            data: [{'question': 'what?'}, {'question': 'when?'}]};

        mock.onGet('/api/v1/questions').reply(200, questionData);

        QuestionService.getQuestions(0, 'any').then((response) => {
            expect(response.data).toEqual(questionData.data);
            done();
        });
    });

    it('Response of getQuestions call fails', async () => {
        let mock = new MockAdapter(axios);
        mock.onGet('/api/v1/questions').reply(404);
        spyOn(console, 'log');
        await QuestionService.getQuestions();
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
});
