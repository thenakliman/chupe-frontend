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

  describe('when executed', () => {
    let retros;
    beforeEach(() => {
      spyOn(cookie, 'getToken').and.returnValue('token');
      retros = Matchers.like({
        'name': 'retro name',
        'maximumVote': 3,
        'id': 101,
        'status': 'CREATED',
        'createdBy': 'James',
      });

      provider.addInteraction({
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
         body: Matchers.eachLike(retros, {min: 1})
        },
      });
    });

    it('should return retros', (done) => {
      RetroService.getRetros()
        .then((response) => {
            const retros = response;
            expect(retros).toEqual(retros);
          }).then(() => {
          provider.verify()
              .then(() => done(), (error) => {
                  console.log("Failed to verify pact", error);
                  done.fail(error);
          });
        });
    });
  });
});
