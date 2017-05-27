import {
  ADD_REMINDER,
  DELETE_REMINDER,
  CLEAR_REMINDERS,
  UNDO_REMINDERS,
  REDO_REMINDERS
} from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';

const reminder = (action) => {
  let { text, dueDate } = action;
  return {
    id: Date.now(),
    text,
    dueDate
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = undefined;

  state = read_cookie('reminders');

  switch (action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      bake_cookie('reminders', reminders);
      return reminders;

    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;

    case CLEAR_REMINDERS:
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;

    default:
      return state;
  }
}

export default combineReducers({
  reminders: undoable(reminders, {
    undoType: UNDO_REMINDERS,
    redoType: REDO_REMINDERS
  })
});
