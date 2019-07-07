import {ActionItemService} from './ActionItemService';
import * as Client from './client';


describe('Action Item Service', () => {
    it('Returns data when get action items are called', async () => {
        const expectedActionItemData = [{id: 101}, {id: 102}];

        spyOn(Client, 'get').and.returnValue(expectedActionItemData);
        const actionItemData = await ActionItemService.getActionItems();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/action-items');
        expect(expectedActionItemData).toEqual(actionItemData);
    });
});
