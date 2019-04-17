import {FeedbackService} from './FeedbackService';
import * as Client from './client';


describe('Feedback Service', () => {
    it('Returns data when get feedback session is called', async () => {
        const feedbackSessions = [{'question': 'what?'}, {'question': 'when?'}];
        spyOn(Client, 'get').and.returnValue(feedbackSessions);

        const receivedFeedbacks = await FeedbackService
                                      .getAllFeedbackSessions();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/feedback-sessions');
        expect(receivedFeedbacks).toEqual(feedbackSessions);
    });
});
