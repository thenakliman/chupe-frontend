import React from 'react'; // eslint-disable-line no-unused-vars
import {TeamFund} from './TeamFund'; // eslint-disable-line no-unused-vars
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import * as history from '../../../utils/history';

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
    describe('should have html elements', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<TeamFund teamFund={[]}
                                    addFund={()=>{}}
                                    fundTypes={[]}
                                    loggedInUser={'username2'}
                                    fetchFundTypes={jest.fn()}
                                    fetchTeamFund={jest.fn()}/>);
      });

      it('Should have table header for username', () => {
          const hasUsername = wrapper.find('th').someWhere(
              (header) => header.props().children === 'Username');
          expect(hasUsername).toBe(true);
      });

      it('Should have table header for S.No', () => {
          const hasUsername = wrapper.find('th').someWhere(
              (header) => header.props().children === 'S.No');
          expect(hasUsername).toBe(true);
      });

      it('Should have table header for Amount', () => {
          const hasUsername = wrapper.find('th').someWhere(
              (header) => header.props().children === 'Amount');
          expect(hasUsername).toBe(true);
      });
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

    it('should set owner state on click of positive sign', () => {
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

        wrapper.find(
            '#fund-operation-positive-sign-username2').simulate('click');

        expect(wrapper.state().owner).toBe('username2');
    });

    it('should set owner state on click of negative sign', () => {
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

        wrapper.find(
            '#fund-operation-negative-sign-username2').simulate('click');

        expect(wrapper.state().owner).toBe('username2');
    });

    describe('when positive button is clicked', () => {
      it('should set owner state to null when pop up is on', () => {
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
          wrapper.find(
              '#fund-operation-positive-sign-username2').simulate('click');

          expect(wrapper.state().owner).toBe(null);
      });
    });

    describe('when negative button is clicked', () => {
      it('should set owner state to null when pop up is on', () => {
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
          wrapper.find(
              '#fund-operation-negative-sign-username2').simulate('click');

          expect(wrapper.state().owner).toBe(null);
      });
    });

    describe('when redeem or add fund operations are performed', () => {
      const teamFund = [
          {owner: 'username1', amount: 100},
          {owner: 'username2', amount: -100},
      ];

      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<TeamFund teamFund={teamFund}
                                    loggedInUser={'username2'}
                                    fundTypes={[]}
                                    addFund={()=>{}}
                                    fetchFundTypes={jest.fn()}
                                    fetchTeamFund={jest.fn()} />);
      });

      describe('when positive button is clicked', () => {
        it('should toggle hasPopUp to true from false', () => {
            wrapper.find(
                '#fund-operation-positive-sign-username2').simulate('click');

            expect(wrapper.state().hasPopup).toBe(true);
        });

        it('should toggle hasPopUp to false from true', () => {
            wrapper.find(
                '#fund-operation-positive-sign-username2').simulate('click');

            wrapper.find(
                '#fund-operation-positive-sign-username2').simulate('click');

            expect(wrapper.state().hasPopup).toBe(false);
        });
      });

      describe('when negative button is clicked', () => {
        it('should toggle hasPopUp to true from false', () => {
            wrapper.find(
                '#fund-operation-negative-sign-username2').simulate('click');

            expect(wrapper.state().hasPopup).toBe(true);
        });

        it('should toggle hasPopUp to false from true', () => {
            wrapper.find(
                '#fund-operation-negative-sign-username2').simulate('click');

            wrapper.find(
                '#fund-operation-negative-sign-username2').simulate('click');

            expect(wrapper.state().hasPopup).toBe(false);
        });
      });
    });

    describe('when pop up is open', () => {
      const teamFund = [
          {owner: 'username1', amount: 100},
          {owner: 'username2', amount: -100},
      ];
      const addFund = jest.fn();
      let wrapper;
      const amount = 1000;
      const fundTypes = [{type: 'BIRTHDAY', id: 1, defaultAmount: 101}];
      beforeEach(() => {
        wrapper = mount(
            <TeamFund teamFund={teamFund}
                      addFund={addFund}
                      loggedInUser={'username2'}
                      fundTypes={fundTypes}
                      fetchFundTypes={jest.fn()}
                      fetchTeamFund={jest.fn()} />);

        wrapper.setState({
            hasPopup: true,
            owner: 'username1',
            transactionType: 'CREDIT'});
      });

      it('should call addFund method on click of submit button', () => {
          wrapper.find('#team-fund-select-type-id').simulate(
              'change', {target: {value: 1}});

          wrapper.find('#team-fund-amount-id').simulate(
              'change', {target: {value: amount}});

          wrapper.find('#team-fund-submit-button-id').simulate('click');

          expect(wrapper.state()).toEqual({
              hasPopup: false,
              owner: null,
              transactionType: '',
          });

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
          wrapper.find('#team-fund-select-type-id').simulate(
              'change', {target: {value: 1}});

          wrapper.find('#team-fund-submit-button-id').simulate('click');

          expect(wrapper.state()).toEqual({
              hasPopup: false, owner: null, transactionType: ''});

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
          wrapper.find('#team-fund-cancel-button-id').simulate('click');

          expect(wrapper.state()).toEqual(
              {hasPopup: false, owner: null, transactionType: ''});
      });
    });

    it('should change history on click of details text', () => {
        const teamFund = [{
          owner: 'username1',
          amount: 100,
        }, {
          owner: 'username2',
          amount: -100,
        }];

        const pushMethod = jest.fn();
        history.history = {push: pushMethod};
        const addFund = jest.fn();
        const wrapper = mount(
            <TeamFund teamFund={teamFund}
                      addFund={addFund}
                      loggedInUser={'username2'}
                      fundTypes={[{type: 'BIRTHDAY', id: 1}]}
                      fetchFundTypes={jest.fn()}
                      fetchTeamFund={jest.fn()} />);

        wrapper.find('#user-amount-username1').simulate('click');
        expect(pushMethod).toHaveBeenCalledWith('/funds/username1');
    });
});
