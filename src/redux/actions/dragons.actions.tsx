import { dragonsContants } from 'redux/constants';
import { IDragon, IDragons } from 'models';

export const setAllDragons = (dragons: IDragons) => ({
  type: dragonsContants.SET_ALL_DRAGONS,
  dragons
})

export const setDragon = (dragon: IDragon) => ({
  type: dragonsContants.SET_DRAGON,
  dragon,
})

export const setEditedDragon = (dragonId: string, dragon: IDragon) => ({
  type: dragonsContants.EDIT_DRAGON_BY_ID,
  dragonId,
  dragon,
});

export const setDeletedDragon = (dragonId: string) => ({
  type: dragonsContants.DELETE_DRAGON,
  dragonId,
});

export const booksActions = {
  setAllDragons,
  setDragon,
  setEditedDragon,
  setDeletedDragon,
};







