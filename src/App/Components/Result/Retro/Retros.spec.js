/* eslint-disable */
import React from 'react';
import {Retros} from './Retros';
/* eslint-enable */
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as history from '../../../utils/history';

const retros = [{
  name: 'retro - 1',
  id: 10,
  createdBy: 'fake user - 1',
}, {
  name: 'retro - 2',
  id: 11,
  createdBy: 'fake user - 2',
}];

describe('Show retro component', () => {
  it('should call getAllRetros on component did mount ', () => {
    const getAllRetros = jest.fn();
    shallow(
        <Retros
            retros={retros}
            getAllRetros={getAllRetros}
        />
    );

    expect(getAllRetros).toHaveBeenCalledWith();
  });

  it('should have initial state for creatingRetro to false', () => {
    const getAllRetros = jest.fn();
    const wrapper = shallow(
        <Retros
            retros={retros}
            getAllRetros={getAllRetros}
        />
    );

    expect(wrapper.state().creatingRetro).toBe(false);
  });

  it('should set creatingRetro to true on click of create retro button', () => {
    const getAllRetros = jest.fn();
    const wrapper = shallow(
        <Retros
            retros={retros}
            getAllRetros={getAllRetros}
        />
    );

    wrapper.find('#retro-button-id').simulate('click');
    expect(wrapper.state().creatingRetro).toBe(true);
  });

  it('should call create retro', () => {
    const getAllRetros = jest.fn();
    const createRetro = jest.fn();
    const wrapper = shallow(
        <Retros
            retros={retros}
            createRetro={createRetro}
            getAllRetros={getAllRetros}
        />
    );

    const retro = {name: 'retro'};
    wrapper.instance().createRetro(retro);
    expect(createRetro).toHaveBeenCalledWith(retro);
    expect(wrapper.state().creatingRetro).toBe(true);
  });

  it('should call create retro on click of button', () => {
    const getAllRetros = jest.fn();
    const createRetro = jest.fn();
    const wrapper = mount(
        <Retros
            retros={retros}
            createRetro={createRetro}
            getAllRetros={getAllRetros}
        />
    );

    wrapper.find('#retro-button-id').simulate('click');
    expect(wrapper.find('CreateRetroPopUp').length).toBe(1);
    const testName = 'testName';
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

  it('should render CreateRetroPopUp when creatingRetro is true', () => {
    const getAllRetros = jest.fn();
    const createRetro = jest.fn();
    const wrapper = mount(
        <Retros
            retros={retros}
            createRetro={createRetro}
            getAllRetros={getAllRetros}
        />
    );

    wrapper.setState({creatingRetro: true});
    expect(wrapper.find('CreateRetroPopUp').length).toBe(1);
  });

  it('should toggle state of creatingRetro on after creation of retro', () => {
    const getAllRetros = jest.fn();
    const createRetro = jest.fn();
    const wrapper = shallow(
        <Retros
            retros={retros}
            createRetro={createRetro}
            getAllRetros={getAllRetros}
        />
    );

    const retro = {name: 'retro'};
    wrapper.instance().createRetro(retro);
    expect(wrapper.state().creatingRetro).toBe(true);
  });

  it('should show row for each retro', () => {
    const getAllRetros = jest.fn();
    const wrapper = shallow(
        <Retros
            retros={retros}
            getAllRetros={getAllRetros}
        />
    );

    expect(wrapper.find('#all-retro-table-body-id').children().length).toBe(2);
  });


  it('should show retro on click of retro point', () => {
    const getAllRetros = jest.fn();
    history.history = {push: jest.fn()};
    const getPracticesAssessment = jest.fn(() => Promise.resolve());
    const wrapper = shallow(
        <Retros
            match={{params: {id: 11}}}
            retros={retros}
            getAllRetros={getAllRetros}
            getPracticesAssessment={getPracticesAssessment}
        />
    );

    wrapper.find('#retro-row-id-11').simulate('click');
    expect(history.history.push).toHaveBeenCalledWith('/retro/11');
  });

  describe('should match snapshot', () => {
    const wrapper = shallow(<Retros
        retros={retros}
        getAllRetros={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
