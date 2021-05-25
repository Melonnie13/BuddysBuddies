// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import buddyPic from '../../Images/buddyPic.png'

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
          <NavLink id='navLinkPetsRecent' className='nav-recent' to='/pets/recent'>Recent Pets</NavLink>
          <NavLink id='navLinkPetsSearch' className='nav-search' to="/petsSearch">Search</NavLink>
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
        <div>
          <NavLink id='navLinkHome' className='navBar' exact to="/">Home</NavLink>
          {/* want to put this here <img ^^ className='buddy-pic' src={require('../../Images/buddyPic.png')} /> */}
          {isLoaded && sessionLinks}
        </div>
      </nav>
    </ul>
  );
}

export default Navigation;
