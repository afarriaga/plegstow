import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminders } from '../actions';

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

  renderReminders() {
    const { reminders } = this.props;

    return(
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <span>{ reminder.text }</span>
                <span> - { moment(new Date(reminder.dueDate)).fromNow() }</span>

                <span className="btn btn-xs btn-danger pull-right"
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

        <div className="reminder-list">{ this.renderReminders() }</div>

        <div className="btn btn-warning"
          onClick={() => this.props.clearReminders()}>
          Clear all reminders
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
