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

  it('should have createRetroPoint and creatingRetroPointType set', () => {
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
               createRetroPoint={jest.fn()}
        />);

    expect(wrapper.state().creatingRetroPoint).toBe(false);
    expect(wrapper.state().creatingRetroPointType).toBe('');
  });

  it('should change state when adding a done well retro point', () => {
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
               createRetroPoint={jest.fn()}
        />);

    wrapper.find('#retro-button-for-done-well-id').simulate('click');
    expect(wrapper.state()).toEqual({
        creatingRetroPoint: true,
        creatingRetroPointType: 'DONE_WELL'
    });
  });

  it('should change state when adding a need improvement retro point', () => {
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
               createRetroPoint={jest.fn()}
        />);

    wrapper.find('#retro-button-for-need-improvement-id').simulate('click');
    expect(wrapper.state()).toEqual({
        creatingRetroPoint: true,
        creatingRetroPointType: 'NEED_IMPROVEMENT'
    });
  });

  it('should call createRetroPoint on creation of retro point', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    const castVote = jest.fn();
    const retroPoints = [{
        description: 'description retro',
        id: 2,
        votes: 2,
        type: 'NEED_IMPROVEMENT'
    }];
    const createRetroPoint = jest.fn();
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={retroPoints}
               vote={castVote}
               getRetroPoints={getRetroPoints}
               createRetroPoint={createRetroPoint}
        />);
    const description = 'description';
    wrapper.instance().createRetroPoint(description);
    expect(createRetroPoint).toHaveBeenCalledWith({
        description: description,
        retroId: retroId,
        type: ''});
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
