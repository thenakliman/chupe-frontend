/* eslint-disable */
import React from 'react';
import {ActionItem} from './ActionItem';
/* eslint-disable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';


describe('ActionItem', () => {
  it('should have action item container', () => {
    const wrapper = shallow(
         <ActionItem getActionItems={jest.fn()}
                actionItems={[]}
         />);

    expect(wrapper.find('#action-item-container-id').length).toBe(1);
  });

  it('should call get action items on mount', () => {
    const getActionItems = jest.fn();
    const wrapper = shallow(
         <ActionItem getActionItems={getActionItems}
                actionItems={[]}
         />);

    expect(getActionItems).toHaveBeenCalledWith();
  });

  it('should match snapshot', () => {
    const actionItems = [{
        description: 'description retro',
        type: 'RETROSPECTION',
        deadlineToAct: '2019-06-05T00:00:00.000+0000'
    }];

    const wrapper = shallow(
        <ActionItem getActionItems={jest.fn()}
                    actionItems={actionItems}
        />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
