import React, {useEffect, useState} from 'react';
import Input from "../common/Input";
import Button from '../common/Button';
import {nanoid} from "nanoid";


import {useDispatch, useSelector} from "react-redux";
import {planetColumns} from "../../services/planetsService";
import {getAllPlanets} from "../../store/selectors/planets";
import {setPlanets} from "../../store/actions/planets";

const initialPersonData = planetColumns.reduce((columns, columnName) => {
  columns[columnName] = '';
  return columns;
}, {})

export const PlanetForm = ({history, match}) => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [planetData, setPlanetData] = useState({...initialPersonData});
  const [editMode, setEditMode] = useState(false);
  const planets = useSelector(state => getAllPlanets(state));
  useEffect(() => {
    const planetId = match.params.id;
    if (planetId === "new") return;
    const existingPlanetData = planets.find(planet => planet.id === planetId)
    setPlanetData(existingPlanetData)
    setEditMode(true);
  }, [])

  const validate = (data) => { // super simple validation
    let errors = {};
    Object.entries(data).map(([propKey, propVal]) => {
      if (!propVal && !propKey.includes('gravity')) {
        errors = {...errors, [propKey]: 'Field should not be empty'};
      }
    })
    setFormErrors(errors);
    return errors
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const errors = validate(planetData);

    if (Object.keys(errors).length) {
      return;
    }

    if (editMode) {
      const newPlanetList = planets.map(planet => planet.id === planetData.id ? planetData : planet);
      dispatch(setPlanets(newPlanetList))
    } else {
      dispatch(setPlanets([...planets, {...planetData, beloved: false, id: nanoid()}]))
    }
    history.push('/planets')
  }

  const handleChange = (event) => {
    const {currentTarget: input} = event;
    const data = {...planetData};
    const errors = {...formErrors};
    if (errors[input.name]) {
      delete errors[input.name];
    }

    data[input.name] = input.value;
    setPlanetData(data);
    setFormErrors(errors)
  }

  return (
    <form>
      {planetColumns.map(planetsColName => (
        <Input
          key={planetsColName}
          name={planetsColName}
          label={planetsColName[0].toUpperCase() + planetsColName.slice(1)}
          value={planetData[planetsColName]}
          type={planetsColName === 'beloved' ? 'checkbox' : 'input'}
          error={formErrors[planetsColName]}
          onChange={event => handleChange(event)}
        />
      ))}
      <Button
        onClick={event => onSubmit(event)}
        label="Save"
        disabled={Object.keys(formErrors).length}
        classes="btn btn-dark"
      />
    </form>
  );
};

