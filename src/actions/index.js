import {
  ADD_REMINDER,
  DELETE_REMINDER,
  CLEAR_REMINDERS,
  UNDO_REMINDERS,
  REDO_REMINDERS
} from '../constants';
import { ActionCreators } from 'redux-undo';

export const addReminder = (text, dueDate) => {
  const action = {
    type: ADD_REMINDER,
    text,
    dueDate
  }
  return action;
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  }
  return action;
}

export const clearReminders = () => {
  return {
    type: CLEAR_REMINDERS
  }
}

export const undo = () => {
  return {
    type: UNDO_REMINDERS
  }
}

export const redo = () => {
  return {
    type: REDO_REMINDERS
  }
}
