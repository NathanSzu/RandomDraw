import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';

export default function SignIn({ auth }) {

    const signInWithGoogle = () => {
        // Instantiate Google auth provider
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    return (
        <main className='col-md-4 ml-auto mr-auto'>
            <form>
                <label htmlFor='email'>
                    Email
                </label>
                <input className='w-100' id='email' type='email'>
                </input>
                <label htmlFor='password'>
                    Password
                </label>
                <input className='w-100' id='password' type='password'>
                </input>
                <button className='w-100 mt-2' type='submit' value='login'>Login</button>
            </form>
            <button className='w-50 mt-3' onClick={signInWithGoogle}>Sign in with Google</button>
            {/* <button className='w-50 mt-3' onClick={signInWithGoogle}>Sign in with Facebook</button> */}
        </main>
    )
}
