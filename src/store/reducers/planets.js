import {DELETE_PLANET, LOVE_PLANET, SET_PLANETS} from "../actions/planets";

const initialState = {allPlanets: []}
export const planets = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLANETS: {
      return {
        ...state,
        allPlanets: action.planets
      }
    }
    case DELETE_PLANET: {
      return {
        ...state,
        allPlanets: state.allPlanets.filter(el=>el.id !== action.id)
      }
    }
    case LOVE_PLANET: {
      return {
        ...state,
        allPlanets: state.allPlanets.map((planet)=>{
          return planet.id === action.id ? {...planet, beloved: !planet.beloved} : planet
        })
      }
    }
    default: {
      return state
    }
  }


}