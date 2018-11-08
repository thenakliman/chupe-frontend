import {AnswerService} from './AnswerService';
import * as Client from './client';


describe('Question Service', () => {
    it('Returns data when get answers is called', async () => {
        const answerData = {
            data: [{id: 101}, {id: 102}]};

        spyOn(Client, 'get').and.returnValue(answerData);
        const questionId = 100;
        const answers= await AnswerService.getAnswers(questionId);
        expect(Client.get).toHaveBeenCalledWith(
            '/api/v1/answers?questionId=' + questionId);

        expect(answerData).toEqual(answers);
    });

    it('Returns answer when answer is added', async () => {
        const questionId = 100;
        const answer = {id: questionId};
        spyOn(Client, 'post').and.returnValue({id: questionId});
        const receivedAnswer = await AnswerService.addAnswer(answer);
        expect(Client.post).toHaveBeenCalledWith('/api/v1/answers', answer);
        expect(receivedAnswer).toEqual(answer);
    });

    it('should update answer', async () => {
        const answerId = 100;
        const answer = {id: answerId};
        spyOn(Client, 'put').and.returnValue({id: answerId});

        const receivedAnswer = await AnswerService.updateAnswer(
              answerId, answer);

        expect(Client.put).toHaveBeenCalledWith(
              '/api/v1/answers/' + answerId, answer);
        expect(receivedAnswer).toEqual(answer);
    });
});
