import axios from 'axios';
import {AnswerService} from './AnswerService';
import MockAdapter from 'axios-mock-adapter';


describe('Question Service', () => {
    it('Returns data when get answers is called', (done) => {
        let mock = new MockAdapter(axios);
        const answerData = {
            data: [{id: 101}, {id: 102}]};

        const questionId = 100;

        mock.onGet('/api/v1/answers?questionId=' + questionId)
            .reply(200, answerData);

        AnswerService.getAnswers(questionId).then((response) => {
            expect(response.data).toEqual(answerData.data);
            done();
        });
    });

    it('Response of getAnswers call fails', async () => {
        let mock = new MockAdapter(axios);
        mock.onGet('/api/v1/answers?questionId=1').reply(404);
        spyOn(console, 'log');
        await AnswerService.getAnswers();
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
});
