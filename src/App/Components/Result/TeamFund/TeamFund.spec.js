import React from 'react'; // eslint-disable-line no-unused-vars
import {TeamFund} from './TeamFund'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Team fund component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Team Fund component', () => {
    it('Should have container div for Team fund', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(wrapper.find('#team-fund-container-id').length).toEqual(1);
    });

    it('Should have team fund table', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(wrapper.find('#team-fund-table-id').length).toEqual(1);
    });

    it('Should have table header for username', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Username');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for S.No', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'S.No');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Amount', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Amount');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Amount', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Action');
        expect(hasUsername).toBe(true);
    });

    it('Should fetch team fund on component mount', () => {
        const fetchTeamFund = jest.fn();
        shallow(<TeamFund teamFund={[]}
                          fundTypes={[]}
                          fetchFundTypes={jest.fn()}
                          fetchTeamFund={fetchTeamFund} />);

        expect(fetchTeamFund).toHaveBeenCalledWith();
    });

    it('Should have table row for each team member', () => {
        const teamFund = [{
          username: 'username1',
          amount: 100,
        }, {
          username: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        expect(wrapper.find('tr').length ).toBe(3);
    });
});
