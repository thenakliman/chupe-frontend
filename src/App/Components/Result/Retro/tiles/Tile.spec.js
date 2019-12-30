import React from "react";
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {ActionItemTile, RetroPointTile} from "./Tile";

describe('Show ActionItemTile', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ActionItemTile assignedTo={'assigned to'} description={'description'}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Show RetroPointTile', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<RetroPointTile
        retroId={12343}
        retroPointId={6543}
        votes={3}
        className={'u-red-background-color'}
        onVoteCast={jest.fn()}
        description={'some description'}/>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onVoteCast on click of vote', () => {
    const onVoteCast = jest.fn();
    const wrapper = shallow(<RetroPointTile
        retroId={12343}
        retroPointId={6543}
        votes={3}
        className={'u-red-background-color'}
        onVoteCast={onVoteCast}
        description={'some description'}/>);

    wrapper.find('.footer__vote-text').simulate('click');
    expect(onVoteCast).toHaveBeenCalledWith(12343, 6543);
  });
});
