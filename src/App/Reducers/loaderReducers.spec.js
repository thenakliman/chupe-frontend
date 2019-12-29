import {loaders} from './loaderReducers';

describe('Loader', () => {
  it('should add loaders to redux', () => {
    const newState = loaders([], {
      type: 'SHOW_LOADER',
      payload: 'LOADER_ID',
    });

    expect(newState).toEqual(['LOADER_ID']);
  });

  it('should remove loaders from redux', () => {
    const newState = loaders(['LOADER-1', 'LOADER-2'], {
      type: 'HIDE_LOADER',
      payload: 'LOADER-1',
    });

    expect(newState).toEqual(['LOADER-2']);
  });

  it('should remove loaders when only one loader is in redux', () => {
    const newState = loaders(['LOADER-1'], {
      type: 'HIDE_LOADER',
      payload: 'LOADER-1',
    });

    expect(newState).toEqual([]);
  });

  it('should return existing state when invalid action', () => {
    const newState = loaders([], {
      type: 'INVALID_ACTION',
      payload: 'LOADER_ID',
    });

    expect(newState).toEqual([]);
  });

  it('should return default state when state is undefined', () => {
    const newState = loaders(undefined, {
      type: 'INVALID_ACTION',
      payload: 'LOADER_ID',
    });

    expect(newState).toEqual([]);
  });
});
