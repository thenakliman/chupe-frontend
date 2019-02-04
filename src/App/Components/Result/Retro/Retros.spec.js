/* eslint-disable */
import React from 'react';
import {Retros} from './Retros';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

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

  describe('should match snapshot', () => {
    const wrapper = shallow(<Retros
       retros={retros}
       getAllRetros={jest.fn()}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
