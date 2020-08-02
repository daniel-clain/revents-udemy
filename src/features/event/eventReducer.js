import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from "./eventConstants";
import { createReducer } from "../../app/common/util/reducerUtils";


 const initialState = []


const createEvent = (state, payload) => [...state, payload.event];
const updateEvent = (state, payload) =>
  state.map((event) => (event.id === payload.event.id ? payload.event : event));
const deleteEvent = (state, payload) =>
  state.filter((event) => event.id !== payload.eventId);

const fetchEvents = (state, payload) => {
  return payload.events
}


export default createReducer(initialState, {
  [CREATE_EVENT]: createEvent,
  [UPDATE_EVENT]: updateEvent,
  [DELETE_EVENT]: deleteEvent,
  [FETCH_EVENTS]: fetchEvents

});
