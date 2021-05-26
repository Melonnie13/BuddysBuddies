import {csrfFetch} from './csrf'
// Define Action Types as Constants

const GET_PETS= 'pets/GET_PETS';
const GET_PETS_TYPES= 'pets/GET_PETS_TYPES';
const ADD_PET= 'pets/ADD_PET';
const GET_ONE='pets/GET_ONE';
const UPDATE_ONE='PETS/UPDATE_ONE';

// Define action creators

const getPets = (pets) => ({
    // making use of arrow functions implicit return with parentheses around braces.
    // means this is the return, not a function block
    type: GET_PETS,
    pets,
});

const addPet = (pet) => ({
    type: ADD_PET,
    pet
})

// Define Thunks

export const getPetsAll = () => async (dispatch) => {
    const res = await fetch('/api/pets');
    // do I want a csrfFetch here?
    // csrf attack relies on a form to execute, so
    // don't need to worry about it for a fetch call
    const pets = await res.json();
    console.log('getPets_Store/pets.js', pets);


    // would have some sort of error checking
    if (res.ok){
        dispatch(getPets(pets));
    }
};

export const getPetsRecent = () => async (dispatch) => {

    const res = await fetch('/api/pets/recent');

    if(res.ok){

        const pets = await res.json();
        // console.log('recentpets', recentPets);
        dispatch(getPets(pets));
    }
};

export const addPetNew = (pet) => async (dispatch) => {
    const res = await fetch('/api/pets/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    });

    if(res.ok){
        const petAdded = await res.json();
        dispatch(addPet(petAdded))
        return petAdded;
    }
};

// Define an initial state
const initialState = {};

// Define a reducer

const petsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PETS:
            const petsRecent = {...state};
            action.pets.forEach((pet) => {
                petsRecent[pet.id] = pet
            });
            return {
                ...petsRecent,
                ...state,
            };
        case ADD_PET:{
            if(!state[action.pet.id]){
                const petAdded = {
                    ...state,
                    [action.pet.id]: action.pet
                };
                const pets = petAdded.pets.map(id => petAdded[id]);
                pets.push(action.pet);
                petAdded.list = (pets);
                // can I just sort by created_at?
                return petAdded
            }
            return {
                ...state,
                [action.pet.id]:{
                    ...state[action.pet.id],
                    ...action.pet,
                }
            };
        };


        default:
            return state;
    }
};

// Export the reducer

export default petsReducer;
