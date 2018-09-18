import {TaskService} from './TaskService';
import * as Client from './client';


describe('Task Service', () => {
    it('Returns data when get tasks is called', async () => {
        const tasks = [{description: 'code'}, {description: 'review'}];
        spyOn(Client, 'get').and.returnValue(tasks);

        const receivedTasks = await TaskService.getTasks();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/tasks');
        expect(receivedTasks).toEqual(tasks);
    });
});
