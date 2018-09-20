import {capitalizeFirstLetter} from './stringUtils';

describe('capitalizeFirstLetter', () => {
  it('should capitalize first letter of word', () => {
    expect(capitalizeFirstLetter('hELLOWORLD')).toEqual('Helloworld');
  });

  it('should capitalize first letter of multi word string', () => {
    expect(capitalizeFirstLetter('hello world')).toEqual('Hello world');
  });
});
