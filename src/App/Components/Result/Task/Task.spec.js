import React from 'react'; // eslint-disable-line no-unused-vars
import {Task} from './Task'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Task result component snapshot', () => {
    it('should match the snapshot', () => {
        const tasks = [{
            description: 'task1',
            state: 'fake'
          }, {
            description: 'task2',
            state: 'fake'
          }];
        const wrapper = shallow(<Task tasks={tasks} getTasks={()=>{}}/>);
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
            <Task tasks = {tasks} getTasks={()=>{}}/>);

        expect(wrapper.find('.TaskResult').children().length).toEqual(3);
    });

    it('Component did mount', () => {
        const tasks = [{'taskname': 'task1', state: 'fakeState'}];
        const getTasks = jest.fn();
        shallow(<Task tasks={tasks} getTasks={getTasks} />);
        expect(getTasks).toHaveBeenCalledWith();
    });
});
