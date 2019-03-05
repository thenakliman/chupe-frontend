/* eslint-disable */
import React from 'react';
import {Retro} from './Retro';
/* eslint-disable */
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
  });

  it('should call fetch retro points on component mount', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               getRetroPoints={getRetroPoints}
        />);

    expect(getRetroPoints).toHaveBeenCalledWith(retroId);
  });

  it('should show description of retro point', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];

    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               getRetroPoints={getRetroPoints}
        />);

    expect(wrapper.find('#retro-point-description-2').length).toBe(1);
  });

  it('should have retro point vote id', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               castVote={jest.fn()}
               getRetroPoints={getRetroPoints}
        />);

    expect(wrapper.find('#retro-point-votes-2').length).toBe(1);
  });

  it('should have retro point vote text', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               castVote={jest.fn()}
               getRetroPoints={getRetroPoints}
        />);

    expect(wrapper.find('#retro-point-vote-text-2').length).toBe(1);
  });

  it('should call cast vote on click of vote text', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const castVote = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               vote={castVote}
               getRetroPoints={getRetroPoints}
        />);

    wrapper.find('#retro-point-vote-text-2').simulate('click');
    expect(castVote).toHaveBeenCalledWith(retroId, 2);
  });

  it('should match snapshot', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               getRetroPoints={getRetroPoints}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
