import {QuestionService} from './QuestionService';
import * as Client from './client';


describe('Question Service', () => {
  it('Returns data when get questions is called', async () => {
    const questions = [{'question': 'what?'}, {'question': 'when?'}];
    spyOn(Client, 'get').and.returnValue(questions);

    const receivedQuestions = await QuestionService.getQuestions();

    expect(Client.get).toHaveBeenCalledWith('/api/v1/questions');
    expect(receivedQuestions).toEqual(questions);
  });

  it('Returns when ask questions is called', async () => {
    const question = {'question': 'what?'};
    spyOn(Client, 'post').and.returnValue(question);

    const receivedQuestions = await QuestionService.askQuestion(question);

    expect(Client.post).toHaveBeenCalledWith(
        '/api/v1/questions', question);

    expect(receivedQuestions).toEqual(question);
  });

  it('Return 204 when update question is called', async () => {
    const question = {'question': 'what?', 'id': 10};
    const updatedAnswer = 'updatedAnswer';
    spyOn(Client, 'put').and.returnValue(updatedAnswer);

    const receivedQuestions = await QuestionService.updateQuestion(
        question);

    expect(Client.put).toHaveBeenCalledWith(
        '/api/v1/questions/10', question);

    expect(receivedQuestions).toEqual(updatedAnswer);
  });
});
