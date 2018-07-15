import axios from 'axios';
import * as TokenService from './TokenService';
import * as CookiesUtil from '../utils/cookies';
import MockAdapter from 'axios-mock-adapter';

describe('Token Service', () => {
  describe('if token exist in cookie', () => {
    it('should return stored token if exist in cache', async () => {
      const token = 'Test Token';
      spyOn(CookiesUtil, 'getToken').and.returnValue(token);
      const receivedToken = await TokenService.getToken();
      expect(receivedToken).toEqual(token);
    });
  });

  describe('if token does not exist in cookie', () => {
    it('should return received token', async () => {
        let mock = new MockAdapter(axios);
        const token = 'a fake token for testing purpose';
        const username = 'hazari_sahab';
        spyOn(CookiesUtil, 'getToken').and.returnValue(null);
        spyOn(CookiesUtil, 'setCookies');

        const url = '/token?username=' + username;
        const headers = {
          headers: {
            Authorization: 'Basic aGF6YXJpX3NhaGFiOnVuZGVmaW5lZA==',
          },
        };
        mock.onGet(url, headers).reply(200, {}, {authorization: token});

        const receivedToken = await TokenService.getToken(username, 'abc123');

        expect(receivedToken).toEqual(token);
        expect(CookiesUtil.getToken).toHaveBeenCalledWith();
        expect(CookiesUtil.setCookies).toHaveBeenCalledWith(token);
    });
  });
});
