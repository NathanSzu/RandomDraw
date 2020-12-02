import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function View({ auth, user }) {
    const [viewToggle, setViewToggle] = useState('Collection');
    const [favorites, setFavorites] = useState(true);
    const [addOrEdit, setAddOrEdit] = useState(null);

    const toggleView = () => {
        if (favorites) {
            setViewToggle('Favorites');
            setFavorites(false);
        } else {
            setViewToggle('Collection');
            setFavorites(true);
        }
    };

    const setAdd = () => {

    };

    const setEdit = () => {

    }

    const signOut = () => {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    return (
        <div className='col-md-4 ml-auto mr-auto'>
            <nav className='row'>
                <div className='col-3'>
                    <button className='w-100 mt-2' onClick={toggleView} value='viewToggle'>{viewToggle}</button>
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
                    <div>
                        <h1 className='text-center'>Favorites</h1>
                    </div>
                    :
                    <div>
                        <h1 className='text-center'>Collection</h1>
                        {addOrEdit === 'add' ? <h1>add</h1> : null}
                        {addOrEdit ==='edit' ? <h1>edit</h1> : null}
                        <button className='w-100' value='addList'>+</button>
                    </div>
                }
            </main>
        </div>
    )
}
