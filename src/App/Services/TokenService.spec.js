import * as TokenService from './TokenService';
import * as CookiesUtil from '../utils/cookies';
import * as clients from './client';

describe('Token Service', () => {
  describe('if token exist in cookie', () => {
    it('should return stored token if exist in cache', () => {
      const token = 'Test Token';
      spyOn(CookiesUtil, 'getToken').and.returnValue(token);
      const receivedToken = TokenService.getToken();
      expect(receivedToken).toEqual(token);
    });
  });

  describe('if token does not exist in cookie', () => {
    it('should return received token', () => {
        const token = 'a fake token for testing purpose';
        const username = 'hazari_sahab';
        spyOn(CookiesUtil, 'getToken').and.returnValue(null);
        spyOn(clients, 'get').and.returnValue(token);
        spyOn(CookiesUtil, 'setCookies');

        const receivedToken = TokenService.getToken(username);

        expect(receivedToken).toEqual(token);
        expect(CookiesUtil.getToken).toHaveBeenCalledWith();
        expect(CookiesUtil.setCookies).toHaveBeenCalledWith(token);
        expect(clients.get).toHaveBeenCalledWith('/token?username='+username);
    });
  });
});
