import * as cookies from './cookies';

describe('getCookie', () => {
  afterEach(()=>{
    cookies.cookies.remove('token');
    cookies.cookies.remove('expiryTime');
  });

  it('should return null when get cookie is called', () => {
    expect(cookies.getToken()).toEqual(null);
  });

  it('should return null if expiry time is not set', () => {
    cookies.cookies.set('token', null);
    expect(cookies.getToken()).toEqual(null);
  });

  it('should return token if expiry time is greater than current time', () => {
    const token = 'testToken';
    cookies.cookies.set('token', token);
    // todo(thenakliman) hack, use something better to set date of previous day
    cookies.cookies.set('expiryTime', Date.now()+10000);
    expect(cookies.getToken()).toEqual(token);
  });

  it('should return null if expiry time is less than current time', () => {
    cookies.cookies.set('token', 'TestToken');
    cookies.cookies.set('expiryTime', Date.now()-10);
    expect(cookies.getToken()).toEqual(null);
  });

  it('should return username', () => {
    const username = 'TestUser';
    cookies.cookies.set('username', username);
    expect(cookies.getUsername()).toEqual(username);
  });
});

/* eslint-disable */
const token = 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJjaHVwZS1mcm9udGVuZCIsInN1YiI6InByYXN1bl9oYXphcmkiLCJyb2xlcyI6WyJhZG1pbiJdLCJuYW1lIjoiUHJhc3VuIGhhemFyaSIsImlzcyI6ImNodXBlIiwiZXhwIjoxNTMwMzM2NDA0LCJpYXQiOjE1MzAzMzU4MDQsImVtYWlsIjoicGhhemFyaUBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoicHJhc3VuX2hhemFyaSJ9.jQrBmj8X9sN41zMyUFjB3dy53uASBravnsjNgahh09-HbHrdqu5MF2sBxL2YSluVJqRtR6SGzIcWrfuDNqIVJw';
/* eslint-enable */

describe('set cookies', () => {
  it('should set token cookies', () => {
    cookies.setCookies(token);
    expect(cookies.cookies.get('token')).toEqual(token);
  });

  it('should set username cookies', () => {
    cookies.setCookies(token);
    expect(cookies.cookies.get('username')).toEqual('prasun_hazari');
  });

  it('should set expiryTime cookies', () => {
    cookies.setCookies(token);
    expect(cookies.cookies.get('expiryTime')).toEqual('1530336404');
  });
});

describe('remove cookies', () => {
  beforeEach(() => {
      cookies.setCookies(token);
  });

  it('should remove token cookies', () => {
    cookies.removeCookies(token);
    expect(cookies.cookies.get('token')).toEqual(undefined);
  });

  it('should set username cookies', () => {
    cookies.removeCookies(token);
    expect(cookies.cookies.get('username')).toEqual(undefined);
  });

  it('should set expiryTime cookies', () => {
    cookies.removeCookies(token);
    expect(cookies.cookies.get('expiryTime')).toEqual(undefined);
  });
});
