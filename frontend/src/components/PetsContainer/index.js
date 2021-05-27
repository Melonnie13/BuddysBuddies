// the component that will render recentPets information
// Import hooks from 'react-redux'

import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {getPetsRecent} from '../../store/pets';
// ^^ can I render one component for both??
import './PetsContainer.css';

const PetsContainer = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => Object.values(state.pets));
    // console.log('PetsContainer_components/PetsContainer/index', pets);
    //  Object.values(state.pets));
    // console.log('PetsContainer_', pets);
    // Use a 'react hook and cause a side effect
    useEffect(() => {
        dispatch(getPetsRecent());
    }, [dispatch]);

    return (

        <div className='petsContainerDiv'><h1 id='recentlyAddedTitle'>Newest Buddies</h1>
            <ul className='recentPets'>
                {pets.map(pet =>
                <button className='recentPetsbtn'>
                    <Link  to={`/pets/${pet.id}`}>
                    <div id='recentPetsList' key={pet.id}>
                        <h3>{pet.petName}</h3>
                    </div>
                    </Link>
                        <div>
                        <span>{`age: ${pet.age}`}</span>
                        </div>
                        <div>
                        <span>{`sex: ${pet.sex}`}</span>
                        </div>
                        <div>
                        <span>{`type: ${pet.petType}`}</span>
                        </div>
                        <div>
                        <span>{`good with other pets: ${pet.otherPets}`}</span>
                        </div>
                        <div>
                        <span>{`personality: ${pet.temperament}`}</span>
                        </div>
                        <div>
                        <span>{`special care: ${pet.specialCare}`}</span>
                        </div>
                        <div>
                        <span>{`tricks: ${pet.tricks}`}</span>
                        </div>
                        <div>
                        <span>{`adoptable: ${pet.adoptable}`}</span>
                        </div>
                        <div>
                        <span>{`single: ${pet.single}`}</span>
                        </div>

                    </button>)}
                {/* {where do i set the key here? */}

            </ul>
            <div>

            </div>

        </div>
    )
}

export default PetsContainer
