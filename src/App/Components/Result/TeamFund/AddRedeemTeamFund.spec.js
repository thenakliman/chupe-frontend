/* eslint-disable */
import React from 'react';
import {AddRedeemTeamFund} from './AddRedeemTeamFund';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Team fund component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   addFund={jest.fn()}
                                                   closePopup={()=>{}}
                                                   fundTypes={[]}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Add Redeem Team Fund component', () => {
    const fundTypes = [{type: 1, id: 1}, {type: 't2', id: 2}];
    it('Should have container div', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   addFund={jest.fn()}
                                                   closePopup={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-add-redeem-container-id').length
            ).toEqual(1);
    });

    it('Should fetch team fund type on component will mount', () => {
        const fetchFundTypes = jest.fn();

        shallow(<AddRedeemTeamFund fetchFundTypes={fetchFundTypes}
                                   closePopup={()=>{}}
                                   addFund={jest.fn()}
                                   fundTypes={fundTypes}/>);

        expect(fetchFundTypes).toHaveBeenCalledWith();
    });

    it('Should have select field for add or redeem', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-action-select-id').length).toEqual(1);
    });

    it('Should have two options for select field', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-action-select-id').children().length
            ).toEqual(3);
    });

    it('Should have select field type of fund', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-select-type-id').length).toEqual(1);
    });

    it('Should have select field options', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-select-type-id').children().length
            ).toEqual(3);
    });

    it('Should have input field for amount', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-amount-id').length).toEqual(1);
    });

    it('Should have Submit button', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-submit-button-id').length).toEqual(1);
    });

    it('Should have cancel button', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-cancel-button-id').length).toEqual(1);
    });

    it('should have transaction type set to empty', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.state().transactionType).toEqual('');
    });

    it('should have fund type set to empty', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.state().fundType).toEqual('');
    });

    it('should set amount to default value of transaction type', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.state().amount).toEqual(0);
    });

    it('should update amount in state on change of input', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);
        const amount = 1000;
        wrapper.find('#team-fund-amount-id').simulate(
          'change', {target: {value: amount}});

        expect(wrapper.state().amount).toEqual(amount);
    });

    it('should update transaction type on select', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        wrapper.find('#team-fund-action-select-id').simulate(
          'change', {target: {value: 'CREDIT'}});

        expect(wrapper.state().transactionType).toEqual('CREDIT');
    });

    it('should update fund type on select', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={jest.fn()}
                                                   fundTypes={fundTypes}/>);

        wrapper.find('#team-fund-select-type-id').simulate(
            'change', {target: {value: 1}});

        expect(wrapper.state().fundType).toEqual(1);
    });

    it('should not submit on button click when amount is zero', () => {
        const addFund = jest.fn();
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   closePopup={()=>{}}
                                                   addFund={addFund}
                                                   fundTypes={fundTypes}/>);

        wrapper.setState(
          {
            transactionType: 'CREDIT',
            fundType: 1,
            amount: 0,
          });

        wrapper.find('#team-fund-submit-button-id').simulate('click');
        expect(addFund).not.toHaveBeenCalled();
    });

    it('should submit on button click when amount is not zero', () => {
        const addFund = jest.fn();
        const fundType = 1;
        const transactionType = 'CREDIT';
        const amount = 107;
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   addFund={addFund}
                                                   closePopup={()=>{}}
                                                   fundTypes={fundTypes}/>);

        wrapper.setState(
          {
              transactionType: transactionType,
              fundType: fundType,
              amount: amount,
          });

        wrapper.find('#team-fund-submit-button-id').simulate('click');
        expect(addFund).toHaveBeenCalledWith(transactionType, fundType, amount);
    });

    it('should close pop up on click of cancel button', () => {
        const closePopup = jest.fn();
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   addFund={()=>{}}
                                                   closePopup={closePopup}
                                                   fundTypes={fundTypes}/>);

        wrapper.find('#team-fund-cancel-button-id').simulate('click');
        expect(closePopup).toHaveBeenCalledWith();
    });
});
