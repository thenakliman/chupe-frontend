import {hideLoader, showLoader} from './loaderActions';

describe('should create loader actions', () => {
  it('should return show loader action', async () => {
    const loaderId = 'loader-id';
    expect(showLoader(loaderId)).toEqual({
      type: 'SHOW_LOADER',
      payload: loaderId,
    });
  });

  it('should return hide loader action', async () => {
    const loaderId = 'loader-id';
    expect(hideLoader(loaderId)).toEqual({
      type: 'HIDE_LOADER',
      payload: loaderId,
    });
  });
});
