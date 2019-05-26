/* eslint-disable */
import React from 'react';
import {Retro} from './Retro';
import {AddActionItem} from './AddActionItem';
import {AddRetroPoint} from './AddRetroPoint';
/* eslint-disable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Retro', () => {
  it('should have retro point container', () => {
    const wrapper = shallow(
         <Retro match={{params: {id: 1029}}}
                retroPoints={[]}
                getActionItems={jest.fn()}
                getRetroPoints={jest.fn()}
                getUsers={jest.fn()}
                actionItems={[]}
         />);
    expect(wrapper.find('#retro-points-container-id').length).toBe(1);
  });

  it('should call fetch retro points on component mount', () => {
    const retroId = 1029;
    const getRetroPoints = jest.fn();
    shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               getUsers={jest.fn()}
               actionItems={[]}
               getRetroPoints={getRetroPoints}
               getActionItems={jest.fn()}
        />);

    expect(getRetroPoints).toHaveBeenCalledWith(retroId);
  });

  it('should call fetch action items on component mount', () => {
    const retroId = 1029;
    const getActionItems = jest.fn();
    shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               getUsers={jest.fn()}
               actionItems={[]}
               getRetroPoints={jest.fn()}
               getActionItems={getActionItems}
        />);

    expect(getActionItems).toHaveBeenCalledWith(retroId);
  });

  it('should call fetch users on component mount', () => {
    const retroId = 1029;
    const getUsers = jest.fn();
    shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               getUsers={getUsers}
               actionItems={[]}
               getRetroPoints={jest.fn()}
               getActionItems={jest.fn()}
        />);

    expect(getUsers).toHaveBeenCalledWith();
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
               actionItems={[]}
               getActionItems={jest.fn()}
               getUsers={jest.fn()}
               getRetroPoints={getRetroPoints}
        />);

    expect(wrapper.find('#retro-point-description-2').length).toBe(1);
  });

  it('should show action item of retro point', () => {
    const retroId = 1029;
    const getActionItems = jest.fn();
    const actionItems = [{
        id: 2,
        description: 'description retro',
        assignedTo: 'aise-hi'
    }];

    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               actionItems={actionItems}
               getUsers={jest.fn()}
               getActionItems={getActionItems}
               getRetroPoints={jest.fn()}
        />);

    expect(wrapper.find('#action-item-description-2').length).toBe(1);
  });

  it('should show action item of retro point', () => {
    const retroId = 1029;
    const getActionItems = jest.fn();
    const actionItems = [{
        id: 2,
        description: 'description retro',
        assignedTo: 'aise-hi'
    }];

    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               actionItems={actionItems}
               getUsers={jest.fn()}
               getActionItems={getActionItems}
               getRetroPoints={jest.fn()}
        />);

    wrapper.setState({
        creatingRetroPoint: true, creatingRetroPointType: 'ACTION_ITEM'
    });

    expect(wrapper.find(AddActionItem).length).toBe(1);
  });

  it('should show action item of retro point for done well', () => {
    const retroId = 1029;
    const getActionItems = jest.fn();
    const actionItems = [{
        id: 2,
        description: 'description retro',
        assignedTo: 'aise-hi'
    }];

    const createRetroPoint = jest.fn();
    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               actionItems={actionItems}
               getUsers={jest.fn()}
               getActionItems={getActionItems}
               createRetroPoint={createRetroPoint}
               getRetroPoints={jest.fn()}
        />);

    wrapper.setState({
        creatingRetroPoint: true, creatingRetroPointType: 'DONE_WELL'
    });

    wrapper.find(AddRetroPoint).props().createRetroPoint("description");
    expect(createRetroPoint).toHaveBeenCalledWith({
      description: "description",
      type: "DONE_WELL",
      retroId: retroId
    });
  })
  it('should show pop up for addActionItem', () => {
    const retroId = 1029;
    const getActionItems = jest.fn();
    const actionItems = [{
        id: 2,
        description: 'description retro',
        assignedTo: 'aise-hi'
    }];
    const createActionItem = jest.fn();

    const wrapper = shallow(
        <Retro match={{params: {id: retroId}}}
               retroPoints={[]}
               actionItems={actionItems}
               getUsers={jest.fn()}
               getActionItems={getActionItems}
               getRetroPoints={jest.fn()}
               createActionItem={createActionItem}
        />);

    wrapper.setState({creatingRetroPointType: 'ACTION_ITEM'});
    const retro = {
        description: "some description",
        assignedTO: "assigned",
        deadlineToAct: "some date"
    };

    wrapper.instance().createActionItem(retro);

    expect(createActionItem).toHaveBeenCalledWith({...retro, retroId: retroId});
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
               actionItems={[]}
               castVote={jest.fn()}
               getActionItems={jest.fn()}
               getUsers={jest.fn()}
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
               actionItems={[]}
               castVote={jest.fn()}
               getUsers={jest.fn()}
               getActionItems={jest.fn()}
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
               actionItems={[]}
               vote={castVote}
               getUsers={jest.fn()}
               getActionItems={jest.fn()}
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
               actionItems={[]}
               vote={castVote}
               getActionItems={jest.fn()}
               getUsers={jest.fn()}
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
               actionItems={[]}
               vote={castVote}
               getUsers={jest.fn()}
               getActionItems={jest.fn()}
               getRetroPoints={getRetroPoints}
               createRetroPoint={jest.fn()}
        />);

    wrapper.find('#retro-button-for-done-well-id').simulate('click');
    expect(wrapper.state()).toEqual({
        creatingRetroPoint: true,
        creatingRetroPointType: 'DONE_WELL'
    });
  });

  it('should change state when adding a action item retro point', () => {
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
               actionItems={[]}
               vote={castVote}
               getUsers={jest.fn()}
               getActionItems={jest.fn()}
               getRetroPoints={getRetroPoints}
               createRetroPoint={jest.fn()}
        />);

    wrapper.find('#retro-button-for-action-item-id').simulate('click');
    expect(wrapper.state()).toEqual({
        creatingRetroPoint: true,
        creatingRetroPointType: 'ACTION_ITEM'
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
               actionItems={[]}
               vote={castVote}
               getActionItems={jest.fn()}
               getUsers={jest.fn()}
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
               actionItems={[]}
               vote={castVote}
               getUsers={jest.fn()}
               getActionItems={jest.fn()}
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
               getActionItems={jest.fn()}
               actionItems={[]}
               getUsers={jest.fn()}
               retroPoints={retroPoints}
               getRetroPoints={getRetroPoints}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
