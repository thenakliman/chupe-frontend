/**
 * @jest-environment node
 */

import {RetroService} from '../../src/App/Services/RetroService';
import * as cookie from '../../src/App/utils/cookies';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';


describe('Contract test', () => {
  const {Pact, Matchers} = require('@pact-foundation/pact');
  const path = require('path');
  const provider = new Pact({
      consumer: 'chupe-frontend',
      provider: 'chupe',
      port: 80,
      host: '127.0.0.1',
      log: path.resolve(process.cwd(), 'logs', 'pact.log'),
      dir: path.resolve(process.cwd(), 'pacts'),
      logLevel: 'DEBUG',
      pactfileWriteMode: 'update',
      spec: 2,
    });

  beforeAll((done) => {
      provider.setup().then(() => done());
  });

  afterAll((done) => {
      provider.finalize().then(() => done());
  });

  afterEach(() => {
    return provider.verify();
  })

  describe('Get Retro', () => {
    let retros;
    beforeEach(() => {
      spyOn(cookie, 'getToken').and.returnValue('token');
      retros = {
        'name': 'retro name',
        'maximumVote': 3,
        'id': 101,
        'status': 'CREATED',
        'createdBy': 'James',
      };

      return provider.addInteraction({
       state: 'should return all retros',
       uponReceiving: 'when all retros are fetched',
       withRequest: {
         method: 'GET',
         path: '/api/v1/retros',
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'token',
         },
       },
       willRespondWith: {
         status: 200,
         headers: {'Content-Type': 'application/json'},
         body: Matchers.eachLike(Matchers.like(retros), {min: 1})
        },
      });
    });

    it('should return retros', (done) => {
      RetroService.getRetros()
        .then((response) => {
          expect(response).toEqual([retros]);
          done();
        });
    });
  });

  describe('Get Retro Point', () => {
    let retroPoint;
    beforeEach(() => {
      spyOn(cookie, 'getToken').and.returnValue('token');
      retroPoint = {
        id: 10,
        retroId: 101,
        description: "some description",
        type: "NEED_IMROVEMENT",
        addedBy: "someUser",
        votes: 12
      };

      return provider.addInteraction({
       state: 'should have retro points',
       uponReceiving: 'returns all retros points for a retro',
       withRequest: {
         method: 'GET',
         path: '/api/v1/retro-points',
         query: {retroId: '10'},
         headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': 'token',
         },
       },
       willRespondWith: {
         status: 200,
         headers: {'Content-Type': 'application/json'},
         body: Matchers.eachLike(Matchers.like(retroPoint), {min: 1})
        },
      });
    });

    it('should return retro points', (done) => {
      const retroId = 10;
      RetroService.getRetroPoints(retroId)
        .then((response) => {
          expect(response).toEqual([retroPoint]);
          done();
        })
      });
  });
});
