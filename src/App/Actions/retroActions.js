import {ActionTypes} from './ActionTypes';
import {RetroService} from '../Services/RetroService';


const addRetros = (retros) => ({
  type: ActionTypes.ADD_RETROS,
  payload: retros,
});


export const getAllRetros = () => async (dispatch) => {
  try {
    const retros = await RetroService.getRetros();
    dispatch(addRetros(retros));
  } catch (error) {
    console.log('Error on fetching retros');
  }
};


const addRetroPoints = (retroPoints) => ({
  type: ActionTypes.ADD_RETRO_POINTS,
  payload: retroPoints,
});


export const getRetroPoints = (retroId) => async (dispatch) => {
  try {
    const retroPoints = await RetroService.getRetroPoints(retroId);
    dispatch(addRetroPoints(retroPoints));
  } catch (error) {
    console.log('Error on fetching retro points');
  }
};
