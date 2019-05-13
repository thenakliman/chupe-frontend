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
  });
});
