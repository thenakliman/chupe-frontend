import {RetroService} from './RetroService';
import * as Client from './client';


describe('Retro Service', () => {
    it('Should returns data when get retros is called', async () => {
        const retros = [{name: 'code'}, {name: 'review'}];
        spyOn(Client, 'get').and.returnValue(retros);

        const receivedRetros = await RetroService.getRetros();

        expect(Client.get).toHaveBeenCalledWith('/api/v1/retros');
        expect(receivedRetros).toEqual(retros);
    });

    it('Should return retro points', async () => {
        const retroPoints = [{name: 'code'}, {name: 'review'}];
        spyOn(Client, 'get').and.returnValue(retroPoints);
        const retroId = 1023;
        const receivedRetros = await RetroService.getRetroPoints(retroId);

        expect(Client.get)
          .toHaveBeenCalledWith('/api/v1/retro-points?retroId=' + retroId);

        expect(receivedRetros).toEqual(retroPoints);
    });

    it('Should cast vote', async () => {
        spyOn(Client, 'post').and.returnValue();
        const retroPointId = 1923;
        await RetroService.castVote(retroPointId);

        expect(Client.post)
          .toHaveBeenCalledWith('/api/v1/retro-point-votes/' + retroPointId);
    });

    it('Should create retro', async () => {
        spyOn(Client, 'post').and.returnValue();
        const retro = {name: 'retro-name'};

        await RetroService.createRetro(retro);

        expect(Client.post).toHaveBeenCalledWith('/api/v1/retros', retro);
    });
});
