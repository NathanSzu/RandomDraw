import React, { useState } from 'react'

export default function All() {
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
                    <button className='w-100 mt-2' value='logout'>Sign Out</button>
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
