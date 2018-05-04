import React from 'react'; // eslint-disable-line no-unused-vars
import MenuBar from './Menu'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Menu Bar Snapshot', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<MenuBar getUsers={()=>{}}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Menu Bar Component', () => {
  it('Should display div with class', () => {
    const wrapper = shallow(<MenuBar getUsers={()=>{}}/>);
    expect(wrapper.find('.Header').get(0).props.id).toEqual('chupe-header');
  });
});
