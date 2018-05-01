import axios from 'axios';
import {UserService} from './UserService';
import MockAdapter from 'axios-mock-adapter';


describe('User Service', () => {
    it('Returns data when get users is called', (done) => {
        let mock = new MockAdapter(axios);
        const userData = {
            data: [{'user1': 'user1Data'}, {'user2': 'user2Data'}]};

        mock.onGet('http://localhost:8080/api/v1/users').reply(200, userData);

        UserService.getUsers(0, 'any').then((response) => {
            expect(response.data).toEqual(userData.data);
            done();
        });
    });

    it('Response of getUsers call fails', async () => {
        let mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8080/api/v1/users').reply(404);
        spyOn(console, 'log');
        await UserService.getUsers();
        expect(console.log)
            .toHaveBeenCalledWith('Request failed with status code 404');
    });
});

