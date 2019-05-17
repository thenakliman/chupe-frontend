import React from 'react'; // eslint-disable-line no-unused-vars
import {ShowFund} from './ShowFund'; // eslint-disable-line no-unused-vars
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Show fund component snapshot', () => {
    it('should match the snapshot', () => {
        const match = {params: {id: 'test-owner'}};
        const funds = [
          {id: 10, amount: 10, transactionType: 'CREDIT'},
          {id: 11, amount: 10, transactionType: 'DEBIT'}
        ];

        const wrapper = shallow(<ShowFund fetchFunds={()=>{}}
                                          funds={funds}
                                          match={match}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Show Fund component', () => {
    it('Should have container div for Team fund', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={()=>{}}
                                          funds={[]}
                                          match={match}/>);

        expect(wrapper.find('#user-fund-container-id').length).toEqual(1);
    });

    it('Should call fetch fund on mount', () => {
        const owner = 'test-owner';
        const match = {params: {id: owner}};
        const fetchFunds = jest.fn();
        shallow(<ShowFund fetchFunds={fetchFunds}
                          funds={[]}
                          match={match}/>);

        expect(fetchFunds).toHaveBeenCalledWith(owner);
    });

    it('Should have fund for each member', () => {
        const funds = [{id: 10}, {id: 11}];
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={funds}
                                          match={match}/>);

        expect(wrapper.find('tbody').children().length
            ).toEqual(2);
    });

    it('Should have table header for S.No', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={[]}
                                          match={match}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'S.No');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Owner', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={[]}
                                          match={match}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Owner');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for type ', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={[]}
                                          match={match}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'type');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Amount', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={[]}
                                          match={match}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Amount');
        expect(hasUsername).toBe(true);
    });

    it('Should have table header for Added On', () => {
        const match = {params: {id: 'test-owner'}};
        const wrapper = shallow(<ShowFund fetchFunds={() => {}}
                                          funds={[]}
                                          match={match}/>);

        const hasUsername = wrapper.find('th').someWhere(
            (header) => header.props().children === 'Added On');
        expect(hasUsername).toBe(true);
    });
});
