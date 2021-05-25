// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal'
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
        <LoginFormModal className='login-button' />
        <nav id='innerNavWithLogInSignUp' className='navBar'>
          <button></button>
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
        <nav id='homeNav' className='banner'>
          <button id='nav-home-btn'>
          <NavLink id='navLinkHome' className='navBar' exact to="/">Home</NavLink>
          </button>
          {/* want to put this here <img ^^ className='buddy-pic' src={require('../../Images/buddyPic.png')} /> */}
          <button id='recent-pet-btn' >
          <NavLink id='navLinkPetsRecent' className='nav-recent' to='/pets/recent'>Recently Added Pets</NavLink>
          </button>
          <button id='pet-search-btn'>
          <NavLink id='navLinkPetSearch' className='nav-search' to="/petsSearch">Search</NavLink>
          </button>
          {isLoaded && sessionLinks}

      </nav>
    </ul>
  );
}

export default Navigation;
