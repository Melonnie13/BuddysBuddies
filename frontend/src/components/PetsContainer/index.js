// the component that will render recentPets information
// Import hooks from 'react-redux'

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';


import {getRecentPets} from '../../store/pets';
// ^^ can I render one component for both??
import './PetsContainer.css';

const PetsContainer = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => state.pets);
    console.log('PetsContainer_components/PetsContainer/index', pets);

    //  Object.values(state.pets));
    // console.log('PetsContainer_', pets);

    // Use a 'react hook and cause a side effect
    useEffect(() => {
        dispatch(getRecentPets());
    }, [dispatch]);

    return (
        <div className='petsContainerDiv'>
            <h1 className='recentPets'>
                Recent Pets
            </h1>
            <div>

            </div>

        </div>
    )
}

export default PetsContainer
