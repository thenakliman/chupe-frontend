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
