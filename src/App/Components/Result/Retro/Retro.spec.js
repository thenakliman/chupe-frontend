import React from 'react';
import {Retro} from './Retro';
import {mapStateToProps, mapDispatchToProps} from './RetroContainer';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Retro', () => {
  it('should have retro point container', () => {
    const wrapper = shallow(
         <Retro match={{params: {id: 1029}}}
                retroPoints={[]}
                getRetroPoints={jest.fn()}
         />);
    expect(wrapper.find('#retro-points-container-id').length).toBe(1);
  })

  it('should call fetch retro points on component mount', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               getRetroPoints={getRetroPoints}
        />);

    expect(getRetroPoints).toHaveBeenCalledWith(retroId);
  })

  it('should show description of retro point', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{description: 'description retro', id: 2}];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               getRetroPoints={getRetroPoints}
        />);

    expect(wrapper.find('#retro-point-2').length).toBe(1);
  })

  it('should match snapshot', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{description: 'description retro', id: 2}];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               getRetroPoints={getRetroPoints}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  })
})
