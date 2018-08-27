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

  it('should get team fund types', async () => {
    const teamFund = [{id: 10}];
    spyOn(Client, 'get').and.returnValue(teamFund);

    const receivedTeamFund = await TeamFundService.fetchFundTypes();
    expect(teamFund).toEqual(receivedTeamFund);
    expect(Client.get).toHaveBeenCalledWith('/api/v1/team-funds/type');
  });

  it('should add team fund', async () => {
    const teamFund = {id: 10};
    spyOn(Client, 'post').and.returnValue(teamFund);

    const receivedTeamFund = await TeamFundService.addTeamFund(teamFund);
    expect(teamFund).toEqual(receivedTeamFund);
    expect(Client.post).toHaveBeenCalledWith('/api/v1/team-funds');
  });
});
