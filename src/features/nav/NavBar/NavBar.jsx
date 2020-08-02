import React, { Component } from "react";
import { connect } from 'react-redux'
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { SignedOutMenu } from "../Menus/SignedOutMenu";
import { SignedInMenu } from "../Menus/SignedInMenu";
import { openModal } from '../../modals/modalActions'
import { signOut } from '../../auth/authActions'

const mapDispatchToProps = {
  openModal,
  signOut
}

const mapStateToProps = state => ({
  auth: state.auth
})

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }
  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }


  handleSignOut = () => {
    this.props.signOut()
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} exact to="/" header>
            <img src="assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/test" name="Test" />
          <Menu.Item as={NavLink} to="/events" name="Events" exact />
          {auth.authenticated && <>
            <Menu.Item as={NavLink} to="/people" name="People" exact />
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>
          </>}
          {auth.authenticated ? (
            <SignedInMenu signOut={this.handleSignOut} currentUser={auth.currentUser} />
          ) : (
            <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
          )}
        </Container>
      </Menu>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
