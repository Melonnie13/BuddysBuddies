import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';
import {getPetsAll} from '../../store/pets';
import * as sessionActions from '../../store/session';


const Home = () => {
    const dispatch = useDispatch();
    const pets = useSelector((state) => Object.values(state.pets));
    // console.log('PetsContainer_components/PetsContainer/index', pets);
    //  Object.values(state.pets));
    // console.log('PetsContainer_', pets);
    // Use a 'react hook and cause a side effect

    // const login = () => {
    //     dispatch(sessionActions.login({
    //         credential: 'demo@demo.com',
    //         password: 'demoPassword'
    //     }));
    // };

    useEffect(() => {
        dispatch(getPetsAll());
    }, [dispatch]);

    return (

        <div className='home-div'><h1 id='homeTitle'>Get to Know Buddy and his Buddies</h1>
            <ul className='homePage'>
                {pets.map(pet =>
                <button className='homebtn'>
                    <Link  to={`/pets/${pet.id}`}>
                    <div id='homeList' key={pet.id}>
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
        </div>
    )
}

export default Home;
