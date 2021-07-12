import {csrfFetch} from './csrf'
// Define Action Types as Constants

const GET_PETS= 'pets/GET_PETS';
// const GET_PETS_TYPES= 'pets/GET_PETS_TYPES';
const ADD_PET= 'pets/ADD_PET';
// const GET_ONE='pets/GET_ONE';
const UPDATE_ONE='pets/UPDATE_ONE';
const DELETE_ONE='pets/DELETE_ONE';
const GET_ONE='pets/GET_ONE';

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
const deletePet = (id) => ({
    type: DELETE_ONE,
    id
})
const updatePet = (pet) => ({
    type: UPDATE_ONE,
    pet
})
const getPet = (pet) => ({
    type: GET_ONE,
    pet
})

// Define Thunks

export const getPetsAll = () => async (dispatch) => {
    const res = await csrfFetch('/api/pets');
    // do I want a csrfFetch here?
    // csrf attack relies on a form to execute, so
    // don't need to worry about it for a fetch call
    const pets = await res.json();
    // console.log('getPets_Store/pets.js', pets);
    // would have some sort of error checking
    if (res.ok){
        dispatch(getPets(pets));
    }
};
export const getPetsRecent = () => async (dispatch) => {

    const res = await csrfFetch('/api/pets/recent');

    if(res.ok){

        const pets = await res.json();
        // console.log('recentpets', recentPets);
        dispatch(getPets(pets));
    }
};
export const addPetNew = (pet) => async (dispatch) => {
    const res = await csrfFetch('/api/pets/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    });

    if(res.ok){
        const petAdded = await res.json();
        dispatch(addPet(petAdded.pet))
        //^^ res.json is an object with the pet object nested inside as a key;
        // this petAdded.pet, gives me the pet object at that pet key
        return petAdded.pet;
    }
};
export const deleteAPet = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/pets/delete/${id}`, {
        method: 'DELETE',
    });
    if(res.ok){
        const pet = await res.json();
        dispatch(deletePet(pet.id))

    }
};
export const updateAPet = (pet) => async (dispatch) => {
    const res = await csrfFetch(`/api/pets/update/${pet.id}`, {
        method: 'PUT',
        body: JSON.stringify(pet)
    });
    if (res.ok) {
        const updatedPet = await res.json();
        dispatch(updatePet(pet))
        // console.log('store update thunk', updatedPet);
        return updatedPet;
    }
};
export const getOnePet = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/pets/${id}`);
    // console.log('getOnePetfetch thunk', res)

    if (res.ok) {
        const pet = await res.json();
        // console.log('getOnePetthunkres', pet)
        dispatch(getPet(pet))
        return pet;
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
            return petsRecent;
        case ADD_PET:{
                const petAdded = {
                    ...state,
                    [action.pet.id]: action.pet
                };
                return petAdded;
            };
        case DELETE_ONE:{
            const petDeleted = {...state};
            delete petDeleted[action.id];
            return petDeleted;
            }
        case UPDATE_ONE: {
            const petUpdated = {
                ...action.pet
            };
            return petUpdated;
            }
        case GET_ONE:{
            const onePet = {
                // ...state,
                ...action.pet
            }
            return onePet;
            }




        default:
            return state;
    }
};

// Export the reducer

export default petsReducer;
