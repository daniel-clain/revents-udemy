import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

export default class EventForm extends Component {
  state = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',

  };

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.props.createEvent(this.state)
  };

  handleInputChange = ({target: {value, name}}) => this.setState({[name]: value})

  render() {
    const { cancelFormOpen } = this.props;
    const { title, date, city, venue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name='title' value={title} onChange={this.handleInputChange} placeholder="First Name" autoComplete='off' />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name='date' value={date} type="date" onChange={this.handleInputChange}  placeholder="Event Date" autoComplete='off' />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='city' value={city}  onChange={this.handleInputChange}  placeholder="City event is taking place" autoComplete='off' />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='venue' value={venue}  onChange={this.handleInputChange}  placeholder="Enter the Venue of the event" autoComplete='off' />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' value={hostedBy}  onChange={this.handleInputChange}  placeholder="Enter the name of person hosting" autoComplete='off' />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={cancelFormOpen}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
