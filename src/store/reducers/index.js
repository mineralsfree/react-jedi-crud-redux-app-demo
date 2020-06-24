import {combineReducers} from 'redux'
import people from './people'
import {planets} from "./planets";

export default combineReducers({
  people,
  planets
})