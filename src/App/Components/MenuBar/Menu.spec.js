import React from 'react';
import MenuBar from './Menu';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe("Menu Bar", () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<MenuBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // TODO(thenakliman): Add more test cases for checking that right class has been applied.
});
