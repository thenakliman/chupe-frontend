import * as Client from './client';

const CHUPE_TEAM_FUND_URL = '/api/v1/team-funds';
const CHUPE_FUND_URL = '/api/v1/funds';

export const TeamFundService = {
    async fetchTeamFund() {
        return await Client.get(CHUPE_TEAM_FUND_URL);
    },

    async fetchFundTypes() {
        return await Client.get(`${CHUPE_TEAM_FUND_URL}/type`);
    },

    async addFund(fund) {
        return await Client.post(`${CHUPE_TEAM_FUND_URL}`, fund);
    },

    async getFundsForAUser(owner) {
        return await Client.get(`${CHUPE_FUND_URL}?owner=${owner}`);
    },
};
