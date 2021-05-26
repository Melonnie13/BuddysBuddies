import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import * as petActions from '../../store/pets';
import './CreatePetForm.css';

const TYPES = [
    'dog',
    'cat',
    'guinea pig'
];

const CreatePetForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const pet = useSelector((state) => state.)


    const [petName, setPetName] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [petType, setPetType] = useState('');
    // ^^ what should I use here???
    const [otherPets, setOtherPets] = useState('');
    const [temperament, setTemperament] = useState('');
    const [specialCare, setSpecialCare] = useState('');
    // could be a button and onChange, it could open an input
    const [tricks, setTricks] = useState('yes');
    const [adoptable, setAdoptable] = useState('yes');
    const [single, setSingle] = useState('yes');
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        dispatch(petActions.addPetNew())
    }, [dispatch]);

    const onSubmit = async(e) => {
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
    }

    return(
        <div className='create-pet-form-div'>
        <h2 id='addAPetTitle'> Add a buddy </h2>
        <form className='createAPetForm' onSubmit={onSubmit}>
            <div id='createPetForm-petName-div'>
                <label id='createPetForm-label'>
                    Pet Name
                    <input
                        type='text'
                        className='createPetForm-input'
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div id='createPetForm-age-div'>
                <label id='createPetForm-label'>
                    Pet age
                    <select id='createPetForm-age-select'
                    onChange={(e) => setAge(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={age}>Unsure</option>
                        <option value={age}>1 - 4</option>
                        <option value={age}>5 - 9</option>
                        <option value={age}>10 - 14</option>
                        <option value={age}>15 - 19</option>
                        <option value={age}>20+</option>
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
                    onChange={(e) => setSex(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={petType}>Unsure</option>
                        <option value={petType}>Dog</option>
                        <option value={petType}>Cat</option>
                        <option value={petType}>Guinea Pig</option>
                    </select>
                </label>
            </div>
            <div id='createPetForm-otherPets-div'>
                <label id='createPetForm-label'>
                    Does this Pet Get With Other Pets?
                    <select id='createPetForm-type-select'
                    onChange={(e) => setSex(e.target.value)}
                    required
                    >
                        <option value={inputValue}>Please Select an Option</option>
                        <option value={otherPets}>Unsure</option>
                        <option value={otherPets}>Dog</option>
                        <option value={otherPets}>Cat</option>
                        <option value={otherPets}>Guinea Pig</option>
                    </select>
                </label>
            </div>
            <button type='submit'>

                    add pet

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
