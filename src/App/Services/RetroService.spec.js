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
});
