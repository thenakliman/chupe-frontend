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

  it('Should create retro point', async () => {
    spyOn(Client, 'post').and.returnValue();
    const retro = {name: 'retro-name'};

    await RetroService.createRetroPoint(retro);

    expect(Client.post).toHaveBeenCalledWith('/api/v1/retro-points', retro);
  });

  it('Should create retro action items', async () => {
    spyOn(Client, 'post').and.returnValue();
    const actionItems = {name: 'retro action item'};

    await RetroService.createActionItem(actionItems);

    expect(Client.post).toHaveBeenCalledWith('/api/v1/retro-action-items', actionItems);
  });

  it('Should get action items', async () => {
    spyOn(Client, 'get').and.returnValue();

    await RetroService.getActionItems(100);

    expect(Client.get).toHaveBeenCalledWith('/api/v1/retro-action-items?retro=100');
  });

  it('Should change status', async () => {
    spyOn(Client, 'put').and.returnValue();

    await RetroService.changeStatus(100, 'CLOSED');

    expect(Client.put)
        .toHaveBeenCalledWith('/api/v1/retro-status/100', {status: 'CLOSED'});
  });
});
