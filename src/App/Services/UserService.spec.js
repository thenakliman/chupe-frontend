import {UserService} from './UserService';
import * as Client from './client';


describe('User Service', () => {
  it('Returns data when get users is called', async () => {
    const users = [{'user1': 'user1Data'}, {'user2': 'user2Data'}];
    spyOn(Client, 'get').and.returnValue(users);
    const url = '/api/v1/users';

    const receivedUsers = await UserService.getUsers(url);

    expect(users).toEqual(receivedUsers);
    expect(Client.get).toHaveBeenCalledWith(url);
  });
});

