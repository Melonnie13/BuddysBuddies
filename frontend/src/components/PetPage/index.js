import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import UpdatePet from '../UpdatePet';
import DeletePet from '../DeletePet';

import './PetPage.css';

import * as petActions from '../../store/pets'

const PetPage = () => {
    const dispatch = useDispatch();
    const pet = useSelector((state) => state.pet);
    console.log('petPagecomponent', pet)
    // const {id} = useParams();
    // const history = useHistory();

      useEffect(() => {
        dispatch(petActions.getOnePet(pet))
        console.log('useEffectPet', pet)
        console.log(pet)
    }, [dispatch, pet]);
    // const onePetEvent = async (e) => {
    //     e.preventDefault();

    //     const onePet = await dispatch(petActions.getOnePet(pet))
    //     console.log('petpage*********', onePet);
    //     return onePet;
    // }

    return (

        <div>
            <div id='deleteUpdateComponents'>
                <h1>{pet.petName}</h1>
                <div> {pet.age} </div>
                <div> {pet.sex} </div>
                <div> {pet.petType} </div>
                <div> {pet.otherPets} </div>
                <div> {pet.temperament} </div>
                <div> {pet.specialCare} </div>
                <div> {pet.tricks} </div>
                <div> {pet.adoptable} </div>
                <div> {pet.single} </div>
                <UpdatePet/>
                <DeletePet/>
            {/* could generate a list of MyPets if I wanted at a button like this */}
            </div>
        </div>

    )
}

// set up a state ofr update button clicked or not.

export default PetPage
