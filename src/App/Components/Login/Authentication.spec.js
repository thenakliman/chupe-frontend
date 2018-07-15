import React from 'react';
import {RequireAuthentication} from './Authentication';
import {shallow} from 'enzyme';


describe('Authentication', () => {
  it('should have isAuthorized state in component', () => {
    const component = shallow(<RequireAuthentication />);
    expect(component.state().isAuthorized).toBe(false);
  });

  describe('when user is not Authorized', () => {
    it('should show LoginContainer', () => {
      const wrapper = shallow(<RequireAuthentication />);
      wrapper.setState({isAuthorized: false});

      expect(wrapper.find('#login-container').length).toEqual(1);
    });
  });

  describe('when user is Authorized', () => {
    it('should not show LoginContainer', () => {
      const wrapper = shallow(<RequireAuthentication />);
      wrapper.setState({isAuthorized: true});

      expect(wrapper.find('#login-container').length).toEqual(0);
    });
  });

  it('user should be set to authorized from child', () => {
      const wrapper = shallow(<RequireAuthentication />);
      wrapper.find('#login-container').props().onAuthorization(true);

      expect(wrapper.state().isAuthorized).toBe(true);
  });
});
