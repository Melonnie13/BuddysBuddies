// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormModal from "./components/LoginFormModal/LoginForm";
import SignupFormPage from "./components/SignupFormPage";
import DeletePet from './components/DeletePet';
// import CreateCouchForm from './components/CreateCouchForm';
// import CreatePetForm from './components/CreatePetForm';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PetsContainer from "./components/PetsContainer";
import CreatePetForm from "./components/CreatePetForm";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormModal />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/pets/recent'>
            <PetsContainer />
          </Route>
          <Route path='/pets/add'>
            <CreatePetForm />
          </Route>
          <Route path='/pets/:id'>
            <DeletePet />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
