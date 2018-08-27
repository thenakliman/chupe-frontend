/* eslint-disable */
import React from 'react';
import {AddRedeemTeamFund} from './AddRedeemTeamFund';
/* eslint-enable */
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Team fund component snapshot', () => {
    it('should match the snapshot', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={[]}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

describe('Add Redeem Team Fund component', () => {
    const fundTypes = [{type: 't1', id: 1}, {type: 't2', id: 2}];
    it('Should have container div', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-add-redeem-container-id').length
            ).toEqual(1);
    });

    it('Should fetch team fund type on component will mount', () => {
        const fetchFundTypes = jest.fn();

        shallow(<AddRedeemTeamFund fetchFundTypes={fetchFundTypes}
                                   fundTypes={fundTypes}/>);

        expect(fetchFundTypes).toHaveBeenCalledWith();
    });

    it('Should have select field for add or redeem', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-action-select-id').length).toEqual(1);
    });

    it('Should have two options for select field', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-action-select-id').children().length
            ).toEqual(2);
    });

    it('Should have select field type of fund', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-select-type-id').length).toEqual(1);
    });

    it('Should have select field options', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-select-type-id').children().length
            ).toEqual(2);
    });

    it('Should have input field for amount', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-amount-id').length).toEqual(1);
    });

    it('Should have Submit button', () => {
        const wrapper = shallow(<AddRedeemTeamFund fetchFundTypes={()=>{}}
                                                   fundTypes={fundTypes}/>);

        expect(wrapper.find('#team-fund-submit-button-id').length).toEqual(1);
    });
});
