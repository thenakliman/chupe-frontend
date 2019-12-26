/* eslint-disable */
import React from 'react';
import {AddRetroPoint} from './AddRetroPoint';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Show create retro pop up component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={jest.fn()}
            closeAddRetroPointPopUp={jest.fn()}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have initial state for description and type', () => {
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={jest.fn()}
            closeAddRetroPointPopUp={jest.fn()}
        />);
    expect(wrapper.state()).toEqual({description: ''});
  });

  it('should call closeAddRetroPointPopUp on click of cancel button', () => {
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={jest.fn()}
            closeAddRetroPointPopUp={jest.fn()}
        />);

    wrapper.find('#cancel-add-retro-point-button-id').simulate('click');
  });

  it('should change state description state on edit', () => {
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={jest.fn()}
            closeAddRetroPointPopUp={jest.fn()}
        />);

    const description = 'description';
    wrapper.find('#add-retro-point-description').simulate('change',
        {target: {value: description}});

    expect(wrapper.state().description).toEqual(description);
  });

  it('should value of description on click of add retro point', () => {
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={jest.fn()}
            closeAddRetroPointPopUp={jest.fn()}
        />);

    wrapper.find('#add-retro-point-button-id').simulate('click');

    expect(wrapper.state().description).toEqual('');
  });

  it('should call retro point create on click of add retro point', () => {
    const createRetroPoint = jest.fn();
    const wrapper = shallow(
        <AddRetroPoint
            createRetroPoint={createRetroPoint}
            closeAddRetroPointPopUp={jest.fn()}
        />);

    wrapper.find('#add-retro-point-button-id').simulate('click');

    expect(createRetroPoint).toHaveBeenCalledWith('');
  });
});
