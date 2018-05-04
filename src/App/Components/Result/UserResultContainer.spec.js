import {mapStateToProps} from './UserResultContainer';

describe('User Result Container', () => {
  it('should return all the users', () => {
    const initialState = {users: {usersData: [{'username': 'user1'}]}};
    const props = mapStateToProps(initialState);
    expect(props.users).toEqual(initialState.users.usersData);
  });
});
