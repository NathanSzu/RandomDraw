import React, { useState } from 'react';
import '../App.css'

export default function Edit({ auth, user, resetAddOrEdit }) {

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
        </div>
    )
}
