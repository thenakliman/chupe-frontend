import * as Client from './client';
import {TeamFundService} from './TeamFundService';

describe('fetch team fund', () => {
  it('should get team fund', async () => {
    const teamFund = [{username: 'test-username'}];
    spyOn(Client, 'get').and.returnValue(teamFund);

    const receivedTeamFund = await TeamFundService.fetchTeamFund();
    expect(teamFund).toEqual(receivedTeamFund);
    expect(Client.get).toHaveBeenCalledWith('/api/v1/team-funds');
  });
});
