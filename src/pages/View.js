import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function View({ auth, user }) {
    const [viewToggle, setViewToggle] = useState('Collection');
    const [favorites, setFavorites] = useState(true);

    const toggleView = () => {
        if (favorites) {
            setViewToggle('Favorites');
            setFavorites(false);
        } else {
            setViewToggle('Collection');
            setFavorites(true);
        }
    }

    const signOut = () => {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    return (
        <>
            <nav className='row'>
                <div className='col-3'>
                    <button className='w-100 mt-2' onClick={toggleView} value='logout'>{viewToggle}</button>
                </div>
                <div className='col-6'>
                    LOGO
                </div>
                <div className='col-3'>
                    <button className='w-100 mt-2' onClick={signOut} value='logout'>Sign Out</button>
                </div>
            </nav>
            <main>
                {favorites ?
                    <div>Favorites</div>
                    :
                    <div>Collection</div>
                }
            </main>
        </>
    )
}
