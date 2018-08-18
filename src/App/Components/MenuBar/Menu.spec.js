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
        <MenuBar
            showQuestionTab={()=>{}}
            showUserTab={()=>{}}
            location={location}
        />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Menu Bar Component', () => {
  const location = {pathname: '/users'};

  it('Should display div with header class', () => {
    const wrapper = shallow(
        <MenuBar
            showUserTab={()=>{}}
            location={location}
            showQuestionTab={()=>{}}
        />);
    expect(wrapper.find('.Header').get(0).props.id).toEqual('chupe-header');
  });

  it('Should display div logout', () => {
    const wrapper = shallow(
        <MenuBar
            showUserTab={()=>{}}
            location={location}
            showQuestionTab={()=>{}}
        />);
    expect(wrapper.find('#menu-logout-container').length).toEqual(1);
  });

  it('Should should call removeCookies on click of logout', () => {
    spyOn(cookies, 'removeCookies');
    const pushMock = jest.fn();
    History.history = {push: pushMock};
    const wrapper = shallow(
        <MenuBar
            showUserTab={()=>{}}
            location={location}
            showQuestionTab={()=>{}}
        />);

    wrapper.find('#menu-logout-container').simulate('click');

    expect(cookies.removeCookies).toHaveBeenCalledWith();
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('Should have user class by default', () => {
    const location = {pathname: '/users'};
    const wrapper = shallow(
        <MenuBar
            showUserTab={()=>{}}
            showQuestionTab={()=>{}}
            location={location}
        />);
    expect(wrapper.find('#users-tab').props().className
      ).toEqual('Selected-Tab');
  });

  it('Should have Team Fund tab', () => {
    const location = {pathname: '/team-funds'};
    const wrapper = shallow(
        <MenuBar
            showUserTab={()=>{}}
            showQuestionTab={()=>{}}
            location={location}
        />);
    expect(wrapper.find('#team-funds-tab').length).toEqual(1);
  });
});
