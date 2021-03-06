import React from 'react'; // eslint-disable-line no-unused-vars
import {UserResult} from './UserResult'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('User result component snapshot', () => {
  it('should match the snapshot', () => {
    const users = [{'username': 'user1'}, {'username': 'user2'}];
    const wrapper = shallow(<UserResult users={users} getUsers={() => {
    }}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('User result component', () => {
  it('Display list of users', () => {
    const users = [
      {'username': 'user1'},
      {'username': 'user2'},
      {'username': 'user3'},
    ];
    const wrapper = shallow(
        <UserResult users={users} getUsers={() => {
        }}/>);

    expect(wrapper.find('.UserResult').children().length).toEqual(3);
  });

  it('Component did mount', () => {
    const users = [{'username': 'user1'}];
    const getUsers = jest.fn();
    shallow(<UserResult users={users} getUsers={getUsers}/>);
    expect(getUsers).toHaveBeenCalledWith();
  });
});
