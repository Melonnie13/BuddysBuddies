// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [hasCouch, setHasCouch] = useState('yes');
  // const [hasHostedBefore, setHasHostedBefore] = useState('yes');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
      <div className='signUpFormContainer'>
        <h2 className='title'>Sign up to become a buddy!</h2>
        <form className='signUpForm' onSubmit={onSubmit}>
          {/* <div className='signUpFormDiv'> */}
            <ul className='signUpFormUL'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          {/* </div> */}
            <div className='signUpForm-email-div'>
              <label className='signUpFormLabel'>
                Email
                <input
                  type="text"
                  className='signUpFormInput'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signUpForm-username-div'>
              <label className='signUpFormLabel'>
                Username
                <input
                  type="text"
                  className='signUpFormInput'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signUpForm-password-div'>
              <label className='signUpFormLabel'>
                Password
                <input
                  type="password"
                  className='signUpFormInput'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className='signUpForm-confirmPassword-div'>
              <label className='signUpFormLabel'>
                Confirm Password
                <input
                  type="password"
                  className='signUpFormInput'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </label>
            </div>
          <button className='signUpFormBtn' type="submit">Sign Up</button>
        </form>
      </div>

  );
}

export default SignupFormPage;
