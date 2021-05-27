import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';

import {getPet} from '../../store/pets';
import './PetPage.css';
import {DeletePet} from '../DeletePet';

const PetPage = () => {
    const dispatch = useDispatch();
    const pet = useSelector((state) => Object.values(state.pet))
}


