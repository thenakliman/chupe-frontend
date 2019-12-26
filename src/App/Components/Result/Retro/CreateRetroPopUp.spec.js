/* eslint-disable */
import React from 'react';
import {CreateRetroPopUp} from './CreateRetroPopUp';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Show create retro pop up component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<CreateRetroPopUp createRetro={jest.fn()}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have empty name initially', () => {
    const wrapper = shallow(<CreateRetroPopUp createRetro={jest.fn()}/>);

    expect(wrapper.state().name).toEqual('');
  });

  it('should have maximum vote set to 1 initially', () => {
    const wrapper = shallow(<CreateRetroPopUp createRetro={jest.fn()}/>);

    expect(wrapper.state().maximumVote).toEqual(1);
  });

  it('should set name of retro in state', () => {
    const wrapper = shallow(<CreateRetroPopUp createRetro={jest.fn()}/>);
    const testName = 'some-name';
    wrapper.find('#create-retro-name').simulate(
        'change', {target: {value: testName}});

    expect(wrapper.state().maximumVote).toEqual(1);
  });

  it('should set maximum votes in state on change of input', () => {
    const wrapper = shallow(<CreateRetroPopUp createRetro={jest.fn()}/>);
    const maximumVote = 29;
    wrapper.find('#create-retro-maximum-vote-count').simulate(
        'change', {target: {value: maximumVote}});

    expect(wrapper.state().maximumVote).toEqual(maximumVote);
  });

  it('should call closeCreatePopUp on click of cancel', () => {
    const closeCreatePopUp = jest.fn();
    const wrapper = shallow(
        <CreateRetroPopUp createRetro={jest.fn()}
                          closeCreatePopUp={closeCreatePopUp}
        />);

    wrapper.find('#cancel-create-retro-button-id').simulate('click');
    expect(closeCreatePopUp).toHaveBeenCalledWith();
  });

  it('should call create retro', () => {
    const createRetro = jest.fn();
    const wrapper = shallow(<CreateRetroPopUp createRetro={createRetro}/>);
    const testName = 'some-name';
    wrapper.find('#create-retro-name').simulate(
        'change', {target: {value: testName}});

    const maximumVote = 29;
    wrapper.find('#create-retro-maximum-vote-count').simulate(
        'change', {target: {value: maximumVote}});

    wrapper.find('#create-retro-button-id').simulate('click');

    expect(createRetro).toHaveBeenCalledWith({
      name: testName,
      maximumVote: maximumVote,
    });
  });
});
