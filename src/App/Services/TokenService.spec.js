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
      console.log(receivedToken, token);
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
        mock.onGet(url).reply(200, {}, {authorization: token});

        const receivedToken = await TokenService.getToken(username);

        expect(receivedToken).toEqual(token);
        expect(CookiesUtil.getToken).toHaveBeenCalledWith();
        expect(CookiesUtil.setCookies).toHaveBeenCalledWith(token);
    });
  });
});
