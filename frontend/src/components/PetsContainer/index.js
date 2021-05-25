// the component that will render recentPets information
// Import hooks from 'react-redux'

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';



import {getPetsRecent} from '../../store/pets';
// ^^ can I render one component for both??
import './PetsContainer.css';

const PetsContainer = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => Object.values(state.pets));
    console.log('PetsContainer_components/PetsContainer/index', pets);
    //  Object.values(state.pets));
    // console.log('PetsContainer_', pets);


    // Use a 'react hook and cause a side effect
    useEffect(() => {
        dispatch(getPetsRecent());
    }, [dispatch]);

    return (
        
        <div className='petsContainerDiv'> Recently Added Pets
            <ul className='recentPets'>
                {pets.map(pet =>
                    <div>
                        {pet.petName}
                    </div>)}

            </ul>
            <div>

            </div>

        </div>
    )
}

export default PetsContainer
