import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import * as petActions from '../../store/pets';
import './CreatePetForm.css';

// const TYPES = [
//     'dog',
//     'cat',
//     'guinea pig'
// ];

const CreatePetForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const pet = useSelector((state) => state.)


    const [petName, setPetName] = useState('');
    const [age, setAge] = useState(null);
    const [sex, setSex] = useState('');
    const [petType, setPetType] = useState('');
    // ^^ what should I use here???
    const [otherPets, setOtherPets] = useState('');
    const [temperament, setTemperament] = useState('');
    const [specialCare, setSpecialCare] = useState('');
    // could be a button and onChange, it could open an input
    const [tricks, setTricks] = useState('');
    const [adoptable, setAdoptable] = useState(true);
    const [single, setSingle] = useState(false);
    const [inputValue, setInputValue] = useState('')

    // useEffect(() => {
    //     dispatch(petActions.addPetNew())
    // }, [dispatch]);
    //^^ good for when I want to get information from back end and render on component

    // cant call dispatch inside useeffect for delete, need an async event handler

    const createPet = async(e) => {
        e.preventDefault();

        const addedPet = {
            petName,
            age,
            sex,
            petType,
            otherPets,
            temperament,
            specialCare,
            tricks,
            adoptable,
            single
        };

        const pet = await dispatch(petActions.addPetNew(addedPet))
        if(pet) {
            history.push(`/pets/${pet.id}`);
        }
        // I want the dispatch inside here instead of the useEffect because I need the addedPet first.
        // createPet is my onSubmit.
    }

    // if onSubmit is successful, set all variables back to initial state value
// setPetname(petName)
    return(
        <div className='create-pet-form-div'>
        <h2 id='addPetTitle'> Add a buddy </h2>
        <h4 id='addPetDisclaimer-emergency'> Please seek immediate veterinary care for emergencies and prior to posting.</h4>
        <h4 id='addPetDisclaimer-longterm'> Pets in need of long-term, non-emergency veterinary care may be added.</h4>
        <form className='createAPetForm' onSubmit={createPet}>
            <div id='createPetForm-petName-div'>
                <label id='createPetForm-label'>
                    Pet Name
                    <input
                        type='text'
                        name='petName'
                        className='createPetForm-input'
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div id='createPetForm-age-div'>
                <label id='createPetForm-label'>
                    Pet Age
                    <select id='createPetForm-age-select'
                    onChange={(e) => setAge(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={0}>Unsure</option>
                        <option value={1}>1 - 4</option>
                        <option value={2}>5 - 9</option>
                        <option value={3}>10 - 14</option>
                        <option value={4}>15 - 19</option>
                        <option value={5}>20+</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-sex-div'>
                <label id='createPetForm-label'>
                    Sex of Pet
                    <select id='createPetForm-sex-select'
                    onChange={(e) => setSex(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={sex}>Unsure</option>
                        <option value={sex}>Female</option>
                        <option value={sex}>Male</option>
                        <option value={sex}>Don't Even Know Where I Would Look</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-petType-div'>
                <label id='createPetForm-label'>
                    Type of Pet
                    <select id='createPetForm-type-select'
                    onChange={(e) => setPetType(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={petType}>I'm not sure, yet</option>
                        <option value={petType}>Dog</option>
                        <option value={petType}>Cat</option>
                        <option value={petType}>SMALL ANIMAL</option>
                        <option value={petType}>LARGE ANIMAL</option>

                    </select>
                </label>
            </div>
            <div id='createPetForm-otherPets-div'>
                <label id='createPetForm-label'>
                    Does this Pet Get Along With Other Pets?
                    <select id='createPetForm-type-select'
                    onChange={(e) => setOtherPets(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={otherPets}>I'm not sure, yet</option>
                        <option value={otherPets}>Yes, all pets</option>
                        <option value={otherPets}>Yes, dogs only</option>
                        <option value={otherPets}>Yes, cats only</option>
                        <option value={otherPets}>Yes, cats and dogs</option>
                        <option value={otherPets}>Yes, but no birds</option>
                        <option value={otherPets}>Yes, but no small animals</option>
                        <option value={otherPets}>small animals ONLY</option>
                        <option value={otherPets}>NO OTHER PETS</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-temperament-div'>
                <label id='createPetForm-label'>
                    Pet Personality
                    <select id='createPetForm-type-select'
                    onChange={(e) => setTemperament(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={temperament}>I'm not sure, yet</option>
                        <option value={temperament}>Timid - aggressive, needs Special Care</option>
                        <option value={temperament}>Timid - calm, needs Special Care</option>
                        <option value={temperament}>Friendly - kid friendly</option>
                        <option value={temperament}>Friendly - not kid friendly</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-specialCare-div'>
                <label id='createPetForm-label'>
                    Needs Special Care?
                    <select id='createPetForm-type-select'
                    onChange={(e) => setSpecialCare(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={specialCare}>I'm not sure, yet</option>
                        <option value={specialCare}>Yes - Timid</option>
                        <option value={specialCare}>Yes - Needs Ongoing Vet Care</option>
                        <option value={specialCare}>No - has been checked by a qualified vet</option>
                        <option value={specialCare}>No - but needs regular vet checkup</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-tricks-div'>
                <label id='createPetForm-label'>
                    Any special tricks?
                    <input
                        type='text'
                        name='tricks'
                        className='createPetForm-input'
                        value={tricks}
                        onChange={(e) => setTricks(e.target.value)}
                    />
                </label>
            </div>
            <div id='createPetForm-adoptable-div'>
                Available for Adoption?
                <span>
                    <label id='createPetForm-label'>
                        Yes
                        <input
                            type='radio'
                            value={true}
                            name='adoptable'
                            checked={adoptable === true}
                            onChange={(e) => setAdoptable(true)}
                        />
                    </label>
                    <label id='createPetForm-label'>
                        No
                        <input
                            type='radio'
                            value={false}
                            name='adoptable'
                            checked={adoptable === false}
                            onChange={(e) => setAdoptable(false)}
                        />
                    </label>
                </span>
            </div><div id='createPetForm-single-div'>
                Is this pet single, or part of a pet family?
                <span>
                    <label id='createPetForm-label'>
                        Yes
                        <input
                            type='radio'
                            value={true}
                            name='single'
                            checked={single === true}
                            onChange={(e) => setSingle(true)}
                        />
                    </label>
                    <label id='createPetForm-label'>
                        No
                        <input
                            type='radio'
                            value={false}
                            name='single'
                            checked={single === false}
                            onChange={(e) => setSingle(false)}
                        />
                    </label>
                </span>
            </div>
            <button type='submit'>

                    Add Pet

            </button>
        </form>
        </div>
    )
    // petName,
    // age,
    // sex,
    // petType,
    // otherPets,
    // temperament,
    // specialCare,
    // tricks,
    // adoptable,
    // single



}


export default CreatePetForm
