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
    const [inputValue, setInputValue] = useState('');

    // useEffect(() => {
    //     dispatch(petActions.addPetNew())
    // }, [dispatch]);
    //^^ good for when I want to get information from back end and render on component

    // cant call dispatch inside useeffect for delete, need an async event handler

    const createPet = async(e) => {
        e.preventDefault();

        const pet = {
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

        const addedPet = await dispatch(petActions.addPetNew(pet))
        if(addedPet) {
           return history.push(`/pets/${addedPet.id}`);
        }
        // I want the dispatch inside here instead of the useEffect because I need the addedPet first.
        // createPet is my onSubmit.
    }

    // if onSubmit is successful, set all variables back to initial state value
// setPetname(petName)
    return(
        <div className='create-pet-form-div'>
            <h3 id='addPetTitle'> Add a buddy </h3>
            <div id='addPetDisclaimer-emergency'> Please seek immediate veterinary care for emergencies and prior to posting.</div>
            <div id='addPetDisclaimer-emergency'> Pets in need of long-term, non-emergency veterinary care may be added.</div>
            <form id='createAPetForm' onSubmit={createPet}>
                <div className='createPetFormdiv'>
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
                <div className='createPetFormdiv'>
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
                <div className='createPetFormdiv'>
                    <label id='createPetForm-label'>
                        Sex of Pet
                        <input
                            type='text'
                            name='sex'
                            className='createPetForm-input'
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='createPetFormdiv'>
                    <label id='createPetForm-label'>
                        Type of Pet
                        <input
                            type='text'
                            name='petType'
                            className='createPetForm-input'
                            value={petType}
                            onChange={(e) => setPetType(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='createPetFormdiv'>
                    <label id='createPetForm-label'>
                        Does this pet get along with other pets?
                        <input
                            type='text'
                            name='otherPets'
                            className='createPetForm-input'
                            value={otherPets}
                            onChange={(e) => setOtherPets(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='createPetFormdiv'>
                    <label id='createPetForm-label'>
                        Pet Personality - calm, aggressive, shy, etc...
                        <input
                            type='text'
                            name='temperament'
                            className='createPetForm-input'
                            value={temperament}
                            onChange={(e) => setTemperament(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='createPetFormdiv'>
                    <label id='createPetForm-label'>
                        Does this pet require special care?
                        <input
                            type='text'
                            name='specialCare'
                            className='createPetForm-input'
                            value={specialCare}
                            onChange={(e) => setSpecialCare(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='createPetFormdiv'>
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
                <div className='createPetFormdiv'>
                    Available for Adoption?
                    <span>
                        <label id='createPetForm-label'>
                            Yes
                            <input
                                type='radio'
                                className='createPetForm-input'
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
                                className='createPetForm-input'
                                value={false}
                                name='adoptable'
                                checked={adoptable === false}
                                onChange={(e) => setAdoptable(false)}
                            />
                        </label>
                    </span>
                </div>
                <div className='createPetFormdiv'>
                    Is this pet single, or part of a pet family?
                    <span>
                        <label id='createPetForm-label'>
                            Yes
                            <input
                                type='radio'
                                className='createPetForm-input'
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
                                className='createPetForm-input'
                                value={false}
                                name='single'
                                checked={single === false}
                                onChange={(e) => setSingle(false)}
                            />
                        </label>
                    </span>
                </div>
                <button id='createPetBtn' type='submit'>

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
