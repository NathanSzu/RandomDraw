import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Edit from '../components/Edit'
import 'firebase/auth';

export default function View({ auth, user, db }) {

    const [listCollection, setListCollection] = useState([]);
    const [listFavorite, setListFavorite] = useState([]);
    
    
    var lists = [];
    var favoritesList = [];

    const [viewToggle, setViewToggle] = useState('Collection');
    const [favorites, setFavorites] = useState(true);
    const [addOrEdit, setAddOrEdit] = useState(null);
    const [currentList, setCurrentList] = useState('');

    const toggleView = () => {
        if (favorites) {
            setViewToggle('Favorites');
            setFavorites(false);
        } else {
            setViewToggle('Collection');
            setFavorites(true);
        }
    };

    const fetchLists = () => {
        db.collection(user.uid).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                lists.push(doc.data())
                console.log(doc.id, " => ", doc.data());
                if (doc.data().favorite === true) {
                    favoritesList.push(doc.data())
                }
            });
            setListCollection(lists)
            setListFavorite(favoritesList)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

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

    useEffect(() => {
        fetchLists()
    }, [])

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
                        {listFavorite.map((fav) => (
                            <p>{fav.title}</p>
                        ))}
                    </div>
                    :
                    <div className='position-relative'>
                        <h1 className='text-center'>Collection</h1>
                        {listCollection.map((list) => (
                            <p>{list.title}</p>
                        ))}
                        {addOrEdit === 'add' || addOrEdit === 'edit' ? <Edit user={user} db={db} addOrEdit={addOrEdit} setCurrentList={setCurrentList} currentList={currentList} resetAddOrEdit={resetAddOrEdit} setEdit={setEdit} /> : null}
                        <button className='w-100' onClick={setAdd} value='addList'>+</button>
                    </div>
                }
            </main>
        </div>
    )
}
