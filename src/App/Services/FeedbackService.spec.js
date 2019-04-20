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

    it('should create feedback session', async () => {
        const feedbackSession = {id: 10};
        spyOn(Client, 'post');

        await FeedbackService.saveFeedbackSession(feedbackSession);

        expect(Client.post).toHaveBeenCalledWith('/api/v1/feedback-sessions',
                                                 feedbackSession);
    });

    it('Returns data when get feedback is called', async () => {
        const feedbacks = [{id: 201}];
        spyOn(Client, 'get').and.returnValue(feedbacks);

        const feedbackSessionId = 102;
        const receivedFeedbacks = await FeedbackService.getAllFeedbacks(feedbackSessionId);

        expect(Client.get).toHaveBeenCalledWith('/api/v1/feedback-points?feedbackSessionId=' + feedbackSessionId);
        expect(receivedFeedbacks).toEqual(feedbacks);
    });
});
