import {PracticesService} from './BestPracticesService';
import * as Client from './client';

describe('BestPractices Service', () => {
  describe("getPractices", () => {
    it('should provide best practices', async () => {
      const bestPractices = [{
        "bestPracticeId": 2,
        "retroId": 1,
        "answer": false
      }, {
        "bestPracticeId": 3,
        "retroId": 1,
        "answer": false
      }];

      spyOn(Client, 'get').and.returnValue(bestPractices);

      const receivedBestPractices = await PracticesService.getPractices();

      expect(Client.get).toHaveBeenCalledWith('/api/v1/best-practices');
      expect(receivedBestPractices).toEqual(bestPractices);
    });
  });

  describe("getBestPracticesAssessment", () => {
    it('should provide best practices assessments', async () => {
      const bestPracticesAssessments = [{
        "bestPracticeId": 2,
        "answer": false
      }, {
        "bestPracticeId": 3,
        "answer": false
      }];

      spyOn(Client, 'get').and.returnValue(bestPracticesAssessments);
      const retroId = 121212;

      const receivedBestPractices = await PracticesService.getBestPracticesAssessment(retroId);

      expect(Client.get).toHaveBeenCalledWith(`/api/v1/retros/${retroId}/best-practices-assessments`);
      expect(receivedBestPractices).toEqual(bestPracticesAssessments);
    });
  });

  describe("saveBestPracticesAssessments", () => {
    it('should save best practices assessments', async () => {
      const bestPracticesAssessments = [{
        "bestPracticeId": 2,
        "answer": false
      }, {
        "bestPracticeId": 3,
        "answer": false
      }];

      spyOn(Client, 'post').and.returnValue(bestPracticesAssessments);
      const retroId = 121212;

      const receivedBestPractices = await PracticesService.saveBestPracticesAssessments(retroId, bestPracticesAssessments);

      expect(Client.post).toHaveBeenCalledWith(`/api/v1/retros/${retroId}/best-practices-assessments`, bestPracticesAssessments);
      expect(receivedBestPractices).toEqual(bestPracticesAssessments);
    });
  })
});
