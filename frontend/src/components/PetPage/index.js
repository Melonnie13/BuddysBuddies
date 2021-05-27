import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import UpdatePet from '../UpdatePet';
import DeletePet from '../DeletePet';

import {getPet} from '../../store/pets';
import './PetPage.css';

import * as petActions from '../../store/pets'

const PetPage = () => {
    const dispatch = useDispatch();
    // const pet = useSelector((state) => Object.values(state.pet));
    const {id} = useParams();
    const history = useHistory();

    const onePetEvent = async (e) => {
        e.preventDefault();

        const onePet = await dispatch(petActions.getOnePet)
    }

    return (

        <div>
            <div id='deleteUpdateComponents'>
                <h1>this is the individual pet page component</h1>
                <UpdatePet/>
                <DeletePet/>
            {/* could generate a list of MyPets if I wanted at a button like this */}
            </div>
        </div>

    )
}

// set up a state ofr update button clicked or not.

export default PetPage
