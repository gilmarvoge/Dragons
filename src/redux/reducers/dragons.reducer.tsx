import { dragonsContants } from 'redux/constants';
import { IDragon } from 'models';

const dragons = (state = [], action: any) => {
  switch (action.type) {
    case dragonsContants.SET_ALL_DRAGONS:
      return [...action.dragons];
    case dragonsContants.SET_DRAGON:
      return [...state, action.dragon];
    case dragonsContants.EDIT_DRAGON_BY_ID: {
      const newState = state.map((dragon: IDragon) => {
        if (dragon.id === action.dragonId) {
          return action.dragon;
        }
        return dragon;
      });
      return [...newState];
    }
    case dragonsContants.DELETE_DRAGON: {
      const newState = state.filter((dragon: IDragon) => {
        return dragon.id !== action.dragonId
      })
      return [...newState]
    }
    default:
      return state;
  }
}

export default dragons;
