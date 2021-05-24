// Define action types as constants

const SET_PETS= 'pets/SET_PETS';

// Define action creators

const setPets = (pets) => ({
    // making use of arrow functions implicit return with parentheses around braces.
    // means this is the return, not a function block

    type: SET_PETS,
    pets,


});

// Define thunks

export const getPets = () => async (dispatch) => {
    const res = await fetch('/api/pets');
    if (res.ok){}
};

// Define an initial state

// Define a reducer

const petReducer = {}

// Export the reducer

export default petReducer;
