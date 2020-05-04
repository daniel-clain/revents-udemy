


import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import { EventDetailedPage } from '../../features/event/EventDetailed/EventDetailedPage';
import { HomePage } from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar/NavBar';
import { PeopleDashboard } from '../../features/user/PeopleDashboard/PeopleDashboard';
import { UserDetailedPage } from '../../features/user/UserDetailed/UserDetailedPage';
import { SettingsDashboard } from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';

class App extends Component{
  render(){
    return (
      <>
        <Route path='/' component={HomePage} exact/>
        <Route path='/(.+)' render={() => (
          <>
            <NavBar/>        
            <Container className="main">
              <Route path='/events' component={EventDashboard}/>
              <Route path='/events/:id' component={EventDetailedPage}/>
              <Route path='/people' component={PeopleDashboard}/>
              <Route path='/profile/:id' component={UserDetailedPage}/>
              <Route path='/settings' component={SettingsDashboard}/>
              <Route path='/createEvent' component={EventForm}/>
              <Route path='/test' component={TestComponent}/>
            </Container>
          </>
        )}/>

      </>
      
    );
  } 
}

export default App;
