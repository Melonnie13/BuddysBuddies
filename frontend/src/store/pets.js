// Define Action Types as Constants

const SET_PETS= 'pets/SET_PETS';

// Define action creators

const setPets = (pets) => ({
    // making use of arrow functions implicit return with parentheses around braces.
    // means this is the return, not a function block

    type: SET_PETS,
    pets,


});

// Define Thunks

export const getPets = () => async (dispatch) => {
    const res = await fetch('/api/pets');
    // do I want a csrfFetch here?
    // csrf attack relies on a form to execute, so
    // don't need to worry about it for a fetch call
    const pets = await res.json();
    console.log('getPets_Store/pets.js', pets);


    // would have some sort of error checking
    if (res.ok){
        dispatch(setPets(pets));
    }
};

export const getRecentPets = () => async (dispatch) => {

    const res = await fetch('/api/pets/recent');

    if(res.ok){

        const pets = await res.json();
        // console.log('recentpets', recentPets);
        dispatch(setPets(pets));
    }
};

// Define an initial state
const initialState = {};

// Define a reducer

const petsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PETS:
            const recentPets = {...state};
            action.pets.forEach((pet) => {
                recentPets[pet.id] = pet
            });
            return {
                ...recentPets,
                ...state,
            };
        default:
            return state;
    }
};

// Export the reducer

export default petsReducer;
