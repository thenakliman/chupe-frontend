import React from 'react'; // eslint-disable-line no-unused-vars
import {Login} from './Login'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import * as History from '../../utils/history';
describe('Login page', () => {
  it('should display an icon on load of the page', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#login-page-icon-id').length).toEqual(1);
  });

  it('should have get started button', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('#login-page-get-started-button-id').length).toEqual(1);
  });

  it('should send to users list on click of get started button', () => {
    History.history = {push: jest.fn()};
    const wrapper = shallow(<Login/>);
    wrapper.find('#login-page-get-started-button-id').simulate('click');
    expect(History.history.push).toHaveBeenCalledWith('/users');
  });
});
