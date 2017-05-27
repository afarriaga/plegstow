import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addReminder,
  deleteReminder,
  clearReminders,
  undo,
  redo
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    };
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderListControls() {
    const { reminders } = this.props;
    const history = reminders.reminders.history;

    return(
      <div className="reminder-list-controls">
        <span className="btn btn-danger"
          onClick={() => this.props.clearReminders()}>
          Clear all reminders
        </span>

        <span className="btn btn-primary"
          onClick={() => this.props.undo()}
          disabled={history.past.length === 0 ? true : false }>
          undo
        </span>

        <span className="btn btn-primary"
          onClick={() => this.props.redo()}
          disabled={history.future.length === 0 ? true : false }>
          redo
        </span>
    </div>
    )
  }

  renderReminders() {
    const { reminders } = this.props;

    return(
      <ul className="list-group">
        {
          reminders.reminders.present.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <span>{ reminder.text }</span>
                <span> - { moment(new Date(reminder.dueDate)).fromNow() }</span>

                <span className="btn btn-xs pull-right"
                  onClick={() => this.deleteReminder(reminder.id)}>
                  &#x2715;
                </span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div id="App" className="container">
        <h1 className="title">
          Remind.me
          <p className="small">Reminders done right!</p>
        </h1>

        <div className="form-inline">
          <input className="form-control"
            onChange={event => this.setState({text: event.target.value})}
            placeholder="Write a reminder..." />

          <input className="form-control"
            type='datetime-local'
            onChange={event => this.setState({dueDate: event.target.value})} />

          <button type="submit"
            className="btn btn-success"
            onClick={() => this.addReminder()}>
            Add reminder
          </button>
        </div>

        { this.renderListControls() }
        <div className="reminder-list">{ this.renderReminders() }</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders,
  undo,
  redo
})(App);
