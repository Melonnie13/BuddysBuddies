// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <nav id='innerNavWithLogInSignUp' className='navBar'>
          <NavLink id='navLinkLogin' className='nav-login' to="/login">Log In</NavLink>
          <NavLink id='navLinkSignup' className='nav-signup' to="/signup">Sign Up</NavLink>
        </nav>
      </>
    );
  }

  return (
    <ul>
        {/* will render an ul with a navigation link to the home page
            should only contain nav links to the login and signup routes when
            there is no session user, and a logout button when there is */}
        <nav id='homeNav'>
        <li>
          <NavLink id='navLinkHome' className='navBar' exact to="/">Home</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </nav>
    </ul>
  );
}

export default Navigation;
