export const SET_PLANETS = 'SET_PLANETS';
export const DELETE_PLANET = 'DELETE_PLANET'
export const LOVE_PLANET = 'LOVE_PLANET'
export function setPlanets(planets) {
  return {type: SET_PLANETS, planets }
}
export function deletePlanet(id) {
  return {type: DELETE_PLANET, id}

}
export function lovePlanet(id){
  return {type: LOVE_PLANET, id}

}