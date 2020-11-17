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
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}
