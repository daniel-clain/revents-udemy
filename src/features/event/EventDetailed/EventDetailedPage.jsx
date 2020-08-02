import React from "react";
import { Grid } from "semantic-ui-react";
import { EventDetailedHeader } from "./EventDetailedHeader";
import { EventDetailedInfo } from "./EventDetailedInfo";
import { EventDetailedChat } from "./EventDetailedChat";
import { EventDetailedSidebar } from "./EventDetailedSidebar";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.firestore.ordered.events.find(
      (event) => event.id === ownProps.match.params.id
    )
  }
};

const EventDetailedPage = ({ event }) => {
  if(!event) return <></>
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={Object.values(event.attendees)} />
      </Grid.Column>
    </Grid>
  );
};

export default connect(mapStateToProps)(EventDetailedPage);
