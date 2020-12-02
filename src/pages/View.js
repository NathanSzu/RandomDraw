import React, { useState } from 'react';
import firebase from 'firebase/app';
import Edit from '../components/Edit'
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

    const resetAddOrEdit = () => {
        setAddOrEdit(null)
    }

    const setAdd = () => {
        setAddOrEdit('add')
    };

    const setEdit = () => {
        setAddOrEdit('edit')
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
                    <div className='position-relative'>
                        <h1 className='text-center'>Favorites</h1>
                    </div>
                    :
                    <div className='position-relative'>
                        <h1 className='text-center'>Collection</h1>
                        {addOrEdit === 'add' || addOrEdit === 'edit' ? <Edit addOrEdit={addOrEdit} resetAddOrEdit={resetAddOrEdit} /> : null}
                        <button className='w-100' onClick={setAdd} value='addList'>+</button>
                    </div>
                }
            </main>
        </div>
    )
}
