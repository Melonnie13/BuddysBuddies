import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router';

import * as petActions from '../../store/pets';
// import './CreatePetForm.css';

const DeletePet = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const history = useHistory();

    const deletePetEvent = async(e) => {
        e.preventDefault();

        const deletedPet = await dispatch(petActions.deleteAPet(id));
        history.push('/')

    }

    return (
        <div>
            <button onClick={deletePetEvent} className='deleteBtn' type='submit'>Delete Pet</button>
        </div>
    )

}

export default DeletePet;
