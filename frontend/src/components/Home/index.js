import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';
import {getPetsAll} from '../../store/pets';
import * as sessionActions from '../../store/session';
import PetsContainer from '../PetsContainer';


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
                        <PetsContainer />
        </div>
    )
}

export default Home;
