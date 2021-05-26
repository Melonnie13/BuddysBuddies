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

        const pet = await dispatch(petActions.addPetNew(pet))
        if(pet) {
            history.push(`/pets/${pet.id}`);
        }
    }

    return(
        <div className='create-pet-form-div'>
        <h2 id='addAPetTitle'> Add a Pet </h2>
        <form onSubmit={onSubmit}>
        <input
        type='petname'/>

        <button type='submit'>

                add pet

        </button>
        </form>
        </div>
    )



}


export default CreatePetForm
