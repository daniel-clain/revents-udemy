/* global google */
import React, { Component } from "react";
import { Form, Button, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";
import { TextInput } from "../../../app/common/form/TextInput";
import { TextArea } from "../../../app/common/form/TextArea";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { DateInput } from "../../../app/common/form/DateInput";
import { PlaceInput } from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length) {
    event = state.events.find((event) => event.id === eventId);
  }

  return {
    initialValues: event,
  };
};

const mapDispatchToProps = {
  createEvent,
  updateEvent,
};

const validate = combineValidators({
  title: isRequired({ message: "The event title is required" }),
  category: isRequired({ message: "The category is required" }),
  description: composeValidators(
    isRequired({ message: "Please enter a description" }),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date"),
});

const categories = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
  };

  onFormSubmit = (values) => {
    values.venueLatLng = this.state.venueLatLng
    const { createEvent, updateEvent } = this.props;
    if (this.props.initialValues.id) {
      updateEvent(values);
      this.props.history.push(`/events/${values.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob",
      };
      createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }
  };

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        this.setState({
          cityLatLng: latLng,
        })
      )
      .then(() => {
        this.props.change("city", selectedCity);
      });
  };
  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
      .then((results) => getLatLng(results[0]))
      .then((latLng) =>
        this.setState({
          venueLatLng: latLng,
        })
      )
      .then(() => {
        this.props.change("venue", selectedVenue);
      });
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Header sub color="teal" content="Event Details"></Header>
          <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
            <Field
              name="title"
              component={TextInput}
              placeholder="Give your event a name"
            />
            <Field
              name="category"
              component={SelectInput}
              options={categories}
              placeholder="What is youre event about?"
            />
            <Field
              name="description"
              component={TextArea}
              rows={3}
              placeholder="Tell us about your event"
            />

            <Header sub color="teal" content="Event Location Details"></Header>
            <Field
              name="city"
              component={PlaceInput}
              options={{types: ['(cities)']}}
              onSelect={this.handleCitySelect}
              placeholder="Event City"
            />
            <Field
              name="venue"
              component={PlaceInput}
              options={{
                location: new google.maps.LatLng(this.state.cityLatLng),
                radius: 10000,
                types: ['establishment']
              }}
              onSelect={this.handleVenueSelect}
              placeholder="Event Venue"
            />
            <Field
              name="date"
              component={DateInput}
              dateFormat="dd LLL yyyy h:mm a"
              showTimeSelect
              timeFormat="HH:mm"
              placeholder="Event Date"
            />

            <Button
              disabled={invalid || submitting || pristine}
              positive
              type="submit"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={
                initialValues.id
                  ? () => history.push(`/events/${initialValues.id}`)
                  : () => history.push(`/events`)
              }
            >
              Cancel
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
