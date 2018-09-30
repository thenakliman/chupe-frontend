import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {get, post, put} from './client';
import * as cookies from '../utils/cookies';

describe('REST client', () => {
  const fakeToken = 'fake-token';
  beforeEach(() => spyOn(cookies, 'getToken').and.returnValue(fakeToken));

  afterEach(() => () => expect(cookies.getToken).toHaveBeenCalledWith());

  describe('get', () => {
    it('should make a get call', (done) => {
      let mock = new MockAdapter(axios);
      const questionData = {
          data: [{'question': 'what?'}, {'question': 'when?'}]};
      const url = '/api/v1/question';

      mock.onGet(url).reply(200, questionData);

      get(url, {key1: 'value'}).then((response) => {
          expect(response.data).toEqual(questionData.data);
          done();
      });
    });

    it('Response of get call fails', async () => {
        let mock = new MockAdapter(axios);
        const url = '/api/v1/question';
        mock.onGet().reply(404);
        spyOn(console, 'log');

        await get(url);

        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
  });

  describe('post', () => {
    it('should make a post call', (done) => {
      let mock = new MockAdapter(axios);
      const questionData = {
          data: [{'question': 'what?'}, {'question': 'when?'}]};
      const url = '/api/v1/question';
      const body = {question: 100};

      mock.onPost(url, body).reply(200, questionData);

      post(url, body).then((response) => {
          expect(response.data).toEqual(questionData.data);
          done();
      });
    });

    it('Response of post call fails', async () => {
        let mock = new MockAdapter(axios);
        const url = '/api/v1/question';
        mock.onPost().reply(404);
        spyOn(console, 'log');
        const body = {question: 100};

        await post(url, body);

        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
  });

  describe('put', () => {
    it('should make a put call', (done) => {
      let mock = new MockAdapter(axios);
      const questionData = {
          data: [{'question': 'what?'}, {'question': 'when?'}]};
      const url = '/api/v1/question';
      const body = {question: 100};


      mock.onPut(url, body).reply(200, questionData);

      put(url, body).then((response) => {
          expect(response.data).toEqual(questionData.data);
          done();
      });
    });

    it('Response of put call fails', async () => {
        let mock = new MockAdapter(axios);
        const url = '/api/v1/question';
        mock.onPut().reply(404);
        spyOn(console, 'log');
        const body = {question: 100};

        await put(url, body);

        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
  });
});
