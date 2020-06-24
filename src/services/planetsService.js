import {nanoid} from "nanoid";
export const planetColumns = [
  'name',
  'rotation_period',
  'population',
  'diameter',
  'gravity',
]
export const getPlanets = async () => {
  const planetsResponse = await (await fetch('https://swapi.dev/api/planets/')).json();

  return planetsResponse.results.map(({name, rotation_period, population, diameter, gravity}) => ({
    name,
    rotation_period,
    population,
    diameter,
    beloved: false,
    gravity,
    id: nanoid()
  }))
}
