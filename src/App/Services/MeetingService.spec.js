import {MeetingService} from './MeetingService';
import * as Client from './client';


describe('Meeting Service', () => {
    it('Returns data when get meetings is called', async () => {
        const meetings = [{'id': 1}, {'id': 2}];
        spyOn(Client, 'get').and.returnValue(meetings);

        const receivedMeetings = await MeetingService.getMeetings();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/meetings');
        expect(receivedMeetings).toEqual(meetings);
    });

    it('should create meetings', async () => {
        const meeting = {id: 10};
        spyOn(Client, 'post');

        await MeetingService.saveMeeting(meeting);

        expect(Client.post).toHaveBeenCalledWith('/api/v1/meetings', meeting);
    });

    it('should create meeting discussion item', async () => {
        const meetingDiscussionItem = {id: 10};
        spyOn(Client, 'post');

        await MeetingService.saveMeetingDiscussionItem(meetingDiscussionItem);

        expect(Client.post).toHaveBeenCalledWith(
            '/api/v1/meeting-discussion-items',
            meetingDiscussionItem);
    });

    it('Returns data when get meeting discussion item is called', async () => {
        const meetingDiscussionItems = [{id: 201}];
        spyOn(Client, 'get').and.returnValue(meetingDiscussionItems);

        const meetingId = 102;
        const receivedMeetingDiscussionItem = await MeetingService
                  .getMeetingDiscussionItems(meetingId);

        expect(Client.get).toHaveBeenCalledWith(
            '/api/v1/meeting-discussion-items?meetingId=' + meetingId);
        expect(receivedMeetingDiscussionItem).toEqual(meetingDiscussionItems);
    });
});
