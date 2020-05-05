import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };

  if (eventId && state.events.length) {
    event = state.events.find((event) => event.id === eventId);
  }

  return {
    event,
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {
  state = { ...this.props.event };

  componentDidMount() {
    this.setState(this.props.selectedEvent);
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    const { createEvent, updateEvent } = this.props;
    if (this.state.id) {
      updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`)
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
      };
      createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`)
    }
  };

  handleInputChange = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  render() {
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={title}
              onChange={this.handleInputChange}
              placeholder="First Name"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={date}
              type="date"
              onChange={this.handleInputChange}
              placeholder="Event Date"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={city}
              onChange={this.handleInputChange}
              placeholder="City event is taking place"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={venue}
              onChange={this.handleInputChange}
              placeholder="Enter the Venue of the event"
              autoComplete="off"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={hostedBy}
              onChange={this.handleInputChange}
              placeholder="Enter the name of person hosting"
              autoComplete="off"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
