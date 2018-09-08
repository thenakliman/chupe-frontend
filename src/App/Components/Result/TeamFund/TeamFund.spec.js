import React from 'react'; // eslint-disable-line no-unused-vars
import {TeamFund} from './TeamFund'; // eslint-disable-line no-unused-vars
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Team fund component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Team Fund component', () => {
    it('Should have container div for Team fund', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(wrapper.find('#team-fund-container-id').length).toEqual(1);
    });

    it('Should have team fund table', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        expect(wrapper.find('#team-fund-table-id').length).toEqual(1);
    });

    it('Should have table header for username', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Username');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for S.No', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'S.No');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Amount', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Amount');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Amount', () => {
        const wrapper = shallow(<TeamFund teamFund={[]}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Action');
        expect(hasUsername).toBe(true);
    });

    it('Should fetch team fund on component mount', () => {
        const fetchTeamFund = jest.fn();
        shallow(<TeamFund teamFund={[]}
                          addFund={()=>{}}
                          fundTypes={[]}
                          loggedInUser={'username2'}
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
                                          addFund={()=>{}}
                                          loggedInUser={'username2'}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        expect(wrapper.find('tr').length ).toBe(3);
    });

    it('should have owner in state', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        expect(wrapper.state().owner).toBe(null);
    });

    it('should have set owner state as per click', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          fundTypes={[]}
                                          loggedInUser={'username2'}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        wrapper.find('#add-redeem-team-fund-username2').simulate('click');
        expect(wrapper.state().owner).toBe('username2');
    });

    it('should have set owner state to null when pop is on', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          loggedInUser={'username2'}
                                          fundTypes={[]}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);
        wrapper.setState({hasPopup: true});
        wrapper.find('#add-redeem-team-fund-username2').simulate('click');
        expect(wrapper.state().owner).toBe(null);
    });

    it('should toggle hasPopUp to true from false', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          loggedInUser={'username2'}
                                          fundTypes={[]}
                                          addFund={()=>{}}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        wrapper.find('#add-redeem-team-fund-username2').simulate('click');
        expect(wrapper.state().hasPopup).toBe(true);
    });

    it('should toggle hasPopUp to false from true', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const wrapper = shallow(<TeamFund teamFund={teamFund}
                                          loggedInUser={'username2'}
                                          addFund={()=>{}}
                                          fundTypes={[]}
                                          fetchFundTypes={jest.fn()}
                                          fetchTeamFund={jest.fn()} />);

        wrapper.find('#add-redeem-team-fund-username2').simulate('click');
        wrapper.find('#add-redeem-team-fund-username2').simulate('click');
        expect(wrapper.state().hasPopup).toBe(false);
    });

    it('should call addFund method', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const addFund = jest.fn();
        const wrapper = mount(
            <TeamFund teamFund={teamFund}
                      addFund={addFund}
                      loggedInUser={'username2'}
                      fundTypes={[{type: 'BIRTHDAY', id: 1}]}
                      fetchFundTypes={jest.fn()}
                      fetchTeamFund={jest.fn()} />);

        wrapper.setState({hasPopup: true, owner: 'username1'});
        const amount = 1000;

        wrapper.find('#team-fund-select-type-id').simulate(
            'change', {target: {value: 1}});

        wrapper.find('#team-fund-action-select-id').simulate(
            'change', {target: {value: 'CREDIT'}});

        wrapper.find('#team-fund-amount-id').simulate(
            'change', {target: {value: amount}});
        wrapper.find('#team-fund-submit-button-id').simulate('click');

        expect(wrapper.state()).toEqual({hasPopup: false, owner: null});

        expect(addFund).toHaveBeenCalledWith(
          {
            addedBy: 'username2',
            amount: 1000,
            type: 1,
            isApproved: false,
            owner: 'username1',
            transactionType: 'CREDIT',
          }
        );
    });

    it('should call addFund method with default value of fundType', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const fundTypes = [{type: 'BIRTHDAY', id: 1, defaultAmount: 101}];
        const addFund = jest.fn();
        const wrapper = mount(
            <TeamFund teamFund={teamFund}
                      addFund={addFund}
                      loggedInUser={'username2'}
                      fundTypes={fundTypes}
                      fetchFundTypes={jest.fn()}
                      fetchTeamFund={jest.fn()} />);

        wrapper.setState({hasPopup: true, owner: 'username1'});

        wrapper.find('#team-fund-select-type-id').simulate(
            'change', {target: {value: 1}});

        wrapper.find('#team-fund-action-select-id').simulate(
            'change', {target: {value: 'CREDIT'}});

        wrapper.find('#team-fund-submit-button-id').simulate('click');

        expect(wrapper.state()).toEqual({hasPopup: false, owner: null});

        expect(addFund).toHaveBeenCalledWith(
          {
            addedBy: 'username2',
            amount: 101,
            type: 1,
            isApproved: false,
            owner: 'username1',
            transactionType: 'CREDIT',
          }
        );
    });

    it('should change state on click of cancel button', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const addFund = jest.fn();
        const wrapper = mount(
            <TeamFund teamFund={teamFund}
                      addFund={addFund}
                      loggedInUser={'username2'}
                      fundTypes={[{type: 'BIRTHDAY', id: 1}]}
                      fetchFundTypes={jest.fn()}
                      fetchTeamFund={jest.fn()} />);

        wrapper.setState({hasPopup: true, owner: 'username1'});
        wrapper.find('#team-fund-cancel-button-id').simulate('click');

        expect(wrapper.state()).toEqual({hasPopup: false, owner: null});
    });
});
