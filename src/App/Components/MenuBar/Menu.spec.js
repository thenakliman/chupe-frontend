import React from 'react'; // eslint-disable-line no-unused-vars
import {MenuBar} from './Menu'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as cookies from '../../utils/cookies';
import * as History from '../../utils/history';

describe('Menu Bar Snapshot', () => {
  it('should match snapshot', () => {
    const location = {pathname: '/users'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Menu Bar Component', () => {
  const location = {pathname: '/users'};

  it('Should display div with header class', () => {
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('.Header').get(0).props.id).toEqual('chupe-header');
  });

  it('Should display div logout', () => {
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#menu-logout-container').length).toEqual(1);
  });

  it('Should should call removeCookies on click of logout', () => {
    spyOn(cookies, 'removeCookies');
    const pushMock = jest.fn();
    History.history = {push: pushMock};
    const wrapper = shallow(
        <MenuBar location={location}/>);

    wrapper.find('#menu-logout-container').simulate('click');

    expect(cookies.removeCookies).toHaveBeenCalledWith();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('Should have user class by default', () => {
    const location = {pathname: '/users'};
    const wrapper = shallow(<MenuBar location={location}/>);
    expect(wrapper.find('#users-tab').props().className
    ).toEqual('Selected-Tab');
  });

  it('Should have questions tab', () => {
    const location = {pathname: '/questions'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#questions-tab').length).toEqual(1);
  });


  it('Should have Team Fund tab', () => {
    const location = {pathname: '/team-funds'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#team-funds-tab').length).toEqual(1);
  });

  it('Should have tasks tab', () => {
    const location = {pathname: '/tasks'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#tasks-tab').length).toEqual(1);
  });

  it('Should have retros tab', () => {
    const location = {pathname: '/retros'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#retros-tab').length).toEqual(1);
  });

  it('Should have feedback tabs', () => {
    const location = {pathname: '/feedback-sessions'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#feedback-session-tab').length).toEqual(1);
  });

  it('Should have meetings tabs', () => {
    const location = {pathname: '/meetings'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#meetings-tab').length).toEqual(1);
  });

  it('Should have home tabs', () => {
    const location = {pathname: '/home'};
    const wrapper = shallow(
        <MenuBar location={location}/>);
    expect(wrapper.find('#home-tab').length).toEqual(1);
  });
});
