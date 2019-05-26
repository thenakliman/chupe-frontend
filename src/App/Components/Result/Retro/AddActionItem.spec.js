/* eslint-disable */
import React from 'react';
import {AddActionItem} from './AddActionItem';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Show create action item pop up component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have initial state for description, assigned to and due date', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);
    expect(wrapper.state()).toEqual({
      description: '',
      assignedTo: '',
      deadlineToAct: '',
    });
  });

  it('should call closeAddActionItemPopUp on click of cancel button', () => {
    const closeAddActionItemPopUp = jest.fn();
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={closeAddActionItemPopUp}
      />);

    wrapper.find('#cancel-add-action-item-button-id').simulate('click');
    expect(closeAddActionItemPopUp).toHaveBeenCalledWith();
  });

  it('should change state description state on edit', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);

    const description = 'description';
    wrapper.find('#add-action-item-description').simulate('change',
     {target: {value: description}});

    expect(wrapper.state().description).toEqual(description);
  });

  it('should change state of assignedTo state on edit', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);

    const description = 'description';
    wrapper.find('.action-item-assigned-to').simulate('change',
     {target: {value: 'user'}});

    expect(wrapper.state().assignedTo).toEqual('user');
  });

  it('should change state of due date state on edit', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);

    const description = 'description';
    wrapper.find('#action-item-due-date').simulate('change',
     {target: {value: '2019/12/12'}});

    expect(wrapper.state().deadlineToAct).toEqual('2019/12/12');
  });

  it('should value change state to initial on click of add action item', () => {
    const wrapper = shallow(
      <AddActionItem
        users={[{userName: 'user-1'}]}
        createActionItem={jest.fn()}
        closeAddActionItemPopUp={jest.fn()}
      />);

    wrapper.find('#add-action-item-button-id').simulate('click');

    expect(wrapper.state()).toEqual({
      description: '',
      assignedTo: '',
      deadlineToAct: '',
    });
  });

  it('should call retro point create on click of add retro point', () => {
    const createActionItem = jest.fn();
    const wrapper = shallow(
      <AddActionItem
         users={[{userName: 'user-1'}]}
        createActionItem={createActionItem}
        closeAddActionItemPopUp={jest.fn()}
      />);

    wrapper.find('#add-action-item-button-id').simulate('click');

    expect(createActionItem).toHaveBeenCalledWith({
        description: '',
        assignedTo: '',
        deadlineToAct: '',
      });
  });
});
