import React, { useState } from 'react';
import '../App.css'

export default function Edit({ auth, user, resetAddOrEdit, addOrEdit }) {

    return (
        <div className='edit-background row'>
            <div className='col-3'>
                <button className='w-100'>Save</button>
            </div>
            <div className='col-6'>

            </div>
            <div className='col-3'>
                <button className='w-100' onClick={resetAddOrEdit}>X</button>
            </div>
            {addOrEdit === 'edit' ? <button className='w-100'>Delete</button> : null}
        </div>
    )
}
