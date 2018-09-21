import {TaskService} from './TaskService';
import * as Client from './client';


describe('Task Service', () => {
    it('Should returns data when get tasks is called', async () => {
        const tasks = [{description: 'code'}, {description: 'review'}];
        spyOn(Client, 'get').and.returnValue(tasks);

        const receivedTasks = await TaskService.getTasks();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/tasks');
        expect(receivedTasks).toEqual(tasks);
    });

    it('Should returns data when create tasks is called', async () => {
        const task = {name: 'famousName'};
        spyOn(Client, 'post').and.returnValue(task);

        const receivedTasks = await TaskService.createTask(task);

        expect(Client.post).toHaveBeenCalledWith('/api/v1/tasks', task);
        expect(receivedTasks).toEqual(task);
    });
});
