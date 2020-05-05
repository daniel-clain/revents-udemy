import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import { HomePage } from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar/NavBar";
import { PeopleDashboard } from "../../features/user/PeopleDashboard/PeopleDashboard";
import { UserDetailedPage } from "../../features/user/UserDetailed/UserDetailedPage";
import { SettingsDashboard } from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import TestComponent from "../../features/testarea/TestComponent";

class App extends Component {
  render() {
    return (
      <>
        <Route path="/" component={HomePage} exact />
        <Route
          path="/(.+)"
          render={() => (
            <>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route path="/events" component={EventDashboard} exact />
                  <Route path="/events/:id" component={EventDetailedPage} />
                  <Route path="/people" component={PeopleDashboard} exact />
                  <Route path="/profile/:id" component={UserDetailedPage} />
                  <Route path="/settings" component={SettingsDashboard} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={EventForm}
                  />
                  <Route path="/test" component={TestComponent} />
                </Switch>
              </Container>
            </>
          )}
        />
      </>
    );
  }
}

export default withRouter(App);
