import React from 'react'; // eslint-disable-line no-unused-vars
import {Task} from './Task'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Task result component snapshot', () => {
    it('should match the snapshot', () => {
        const tasks = [{
            description: 'task1',
            state: 'fake',
          }, {
            description: 'task2',
            state: 'fake',
          }];
        const wrapper = shallow(<Task tasks={tasks}
                                      currentUser={'lal_singh'}
                                      updateTask={jest.fn()}
                                      createTask={() => {}}
                                      getTasks={()=>{}}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Task result component', () => {
    it('Display list of tasks', () => {
        const tasks = [
            {description: 'task1', state: 'fake'},
            {description: 'task2', state: 'fake'},
            {description: 'task3', state: 'fake'},
        ];
        const wrapper = shallow(
            <Task tasks={tasks}
                  updateTask={jest.fn()}
                  getTasks={()=>{}}
                  currentUser={'lal_singh'}
                  createTask={() => {}}/>);

        expect(wrapper.find('tbody').children().length).toEqual(3);
    });

    it('Component did mount', () => {
        const tasks = [{'taskname': 'task1', 'state': 'fakeState'}];
        const getTasks = jest.fn();
        shallow(<Task tasks={tasks}
                      getTasks={getTasks}
                      updateTask={jest.fn()}
                      currentUser={'lal_singh'}
                      createTask={() => {}}/>);

        expect(getTasks).toHaveBeenCalledWith();
    });

    it('Should have task description input field', () => {
        const tasks = [{'taskname': 'task1', 'state': 'fakeState'}];
        const getTasks = jest.fn();
        const wrapper = shallow(<Task tasks={tasks}
                                      getTasks={getTasks}
                                      updateTask={jest.fn()}
                                      currentUser={'lal_singh'}
                                      createTask={() => {}}/>);

        expect(wrapper.find('#task-input-description').length).toBe(1);
    });

    it('Should have task description input field', () => {
        const tasks = [{'taskname': 'task1', 'state': 'fakeState'}];
        const getTasks = jest.fn();
        const wrapper = shallow(<Task tasks={tasks}
                                      updateTask={jest.fn()}
                                      getTasks={getTasks}
                                      currentUser={'lal_singh'}
                                      createTask={() => {}}/>);
        expect(wrapper.find('#task-create-button').length).toBe(1);
    });

    it('should store input value change in component state', () => {
        const tasks = [{'taskname': 'task1', 'state': 'fakeState'}];
        const getTasks = jest.fn();
        const wrapper = shallow(<Task tasks={tasks}
                                      getTasks={getTasks}
                                      updateTask={jest.fn()}
                                      currentUser={'lal_singh'}
                                      createTask={() => {}}/>);
        const taskDescription = 'task description';
        wrapper.find('#task-input-description').simulate('change',
            {target: {value: taskDescription}});

        expect(wrapper.state()).toEqual({description: taskDescription});
    });

    it('should store input value change in component state', () => {
        const tasks = [{'taskname': 'task1', 'state': 'fakeState'}];
        const getTasks = jest.fn();
        const wrapper = shallow(
            <Task tasks={tasks}
                  updateTask={jest.fn()}
                  getTasks={getTasks}
                  currentUser={'lal_singh'}
                  createTask={() => {}}/>);

        const taskDescription = 'task description';
        wrapper.find('#task-input-description').simulate('change',
            {target: {value: taskDescription}});

        expect(wrapper.state()).toEqual({description: taskDescription});
    });

    it('should call create task on click of create button', () => {
        const tasks = [{'taskname': 'task1'}];
        const getTasks = jest.fn();
        const createTask = jest.fn();
        const username = 'nakli';
        const wrapper = shallow(
            <Task tasks={tasks}
                  getTasks={getTasks}
                  updateTask={jest.fn()}
                  createTask={createTask}
                  currentUser={username}/>);

        const taskDescription = 'task description';
        wrapper.find('#task-input-description').simulate('change',
            {target: {value: taskDescription}});

        wrapper.find('#task-create-button').simulate('click');
        expect(createTask).toHaveBeenCalledWith({
            createdBy: username,
            description: taskDescription,
            progress: 0,
            state: 'CREATED',
        });
        expect(wrapper.state()).toEqual({description: ''});
    });

    it('should call create task on click of create button', () => {
        const tasks = [{'taskname': 'task1'}];
        const createTask = jest.fn();
        const wrapper = shallow(<Task tasks={tasks}
                                      getTasks={jest.fn()}
                                      updateTask={jest.fn()}
                                      createTask={createTask}
                                      currentUser={'fake'}
                                />);

        wrapper.find('#task-create-button').simulate('click');
        expect(createTask).not.toHaveBeenCalled();
    });

    it('should call update task on click of CREATE button', () => {
        const tasks = [
            {description: 'task1', id: 2, state: 'IN_PROGRESS'},
            {description: 'task1', id: 1, state: 'IN_PROGRESS'},
            {description: 'task1', id: 3, state: 'IN_PROGRESS'},
        ];

        const updateTask = jest.fn();
        const wrapper = shallow(<Task tasks={tasks}
                                      getTasks={jest.fn()}
                                      updateTask={updateTask}
                                      createTask={jest.fn()}
                                      currentUser={'fake'}
                                />);

        wrapper.find('#task-state-radio-button-CREATED-1').simulate('change');
        expect(updateTask).toHaveBeenCalledWith({
            description: 'task1',
            id: 1,
            state: 'CREATED'});
    });
});
