import React, { useState } from 'react';
import '../App.css';


const { uuid } = require('uuidv4');

export default function Edit({ auth, user, resetAddOrEdit, addOrEdit, setEdit, setCurrentList, currentList, db }) {

    const save = (e) => {
        var listId = uuid()
        console.log(listId)
        setCurrentList(document.querySelector('#title').value);
        db.collection(user.uid).doc(listId).set({
            title: document.querySelector('#title').value,
            listId: listId
        })
        .then(function() {
            console.log("Document successfully written!");
            setEdit();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    return (
        <div className='edit-background'>
            <div className='row'>
                <div className='col-3'>
                    <button className='w-100' onClick={save}>Save</button>
                </div>
                <div className='col-6 text-center'>
                    <h2>
                        {addOrEdit === 'edit' ? 'Edit List' : null}
                        {addOrEdit === 'add' ? 'New List' : null}
                    </h2>
                </div>
                <div className='col-3'>
                    <button className='w-100' onClick={resetAddOrEdit}>X</button>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {addOrEdit === 'add' ? <form onSubmit={(e) => {e.preventDefault(); save()}}><input className='w-100' type='text' id='title' /></form> : null}
                    {addOrEdit === 'edit' ?
                        <>
                            <h3>{currentList}</h3>
                            <button className='w-100' value='addItem'>+</button>
                        </> : null}
                        {addOrEdit === 'edit' ? <button className='w-100'>Delete List</button> : null}
                </div>
                
            </div>
        </div>
    )
}
