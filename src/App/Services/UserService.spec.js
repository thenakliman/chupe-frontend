import axios from 'axios';
import { UserService } from './UserService';
import MockAdapter from 'axios-mock-adapter';


describe('User Service', () => {
    it('Returns data when get users is called', done => {
        var mock = new MockAdapter(axios);
        const data = [{'user1': 'user1Data'}, {'user2': 'user2Data'}];
        mock.onGet('/api/v1').reply(200, data);

        UserService.getUsers(0, 'any').then(response => {
            expect(response.data).toEqual(data);
            done();
        });
    });
});

