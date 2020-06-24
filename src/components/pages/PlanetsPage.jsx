import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllPlanets} from "../../store/selectors/planets";
import {Link} from "react-router-dom";
import Table from "../common/Table";
import {deletePlanet, lovePlanet} from "../../store/actions/planets";

const PlanetsPage = () => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePlanet(id));
  }
  const handleBeloved = (id) => {
    dispatch(lovePlanet(id))
  }
  const planets = useSelector(state => getAllPlanets(state));
  const getColumns = () => {
    if (!planets.length) return [];
    return Object.keys(planets[0]).map(colName => {
      if (colName === 'beloved') {
        return {
          colName,
          content: ({beloved, id}) => (
            <input
              type="checkbox"
              checked={beloved}
              onChange={() => handleBeloved(id)}
            />
          )
        }
      }
      if (colName === 'name') {
        return {
          colName,
          content: ({name, id}) => (
            <Link style={{color: '#ffc107'}} to={`/planets/${id}`}>{name}</Link>
          )
        }
      }
      return {colName}
    })
  }
  return (
    <div>
      <h3>Planets from Star Wars Universe</h3>
      <Link
        to={"/planets/new"}
        className="btn btn-warning"
        style={{marginBottom: 25}}
      >
        New Planet
      </Link>
      <Table
        columns={getColumns()}
        data={Object.values(planets)}
        tableDescriptor="Planets"
        onDelete={handleDelete}
      />
    </div>

  );
};

export default PlanetsPage;
