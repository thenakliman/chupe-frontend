import * as Client from './client';

const CHUPE_TEAM_FUND_URL = '/api/v1/team-funds';

export const TeamFundService = {
    async fetchTeamFund() {
        return await Client.get(CHUPE_TEAM_FUND_URL);
    },

    async fetchFundTypes() {
        return await Client.get(`${CHUPE_TEAM_FUND_URL}/type`);
    },

    async addFund(fund) {
        console.log(fund, 'funds -----------');
        return await Client.post(`${CHUPE_TEAM_FUND_URL}`, fund);
    },
};