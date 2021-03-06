import React, { useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router';

export default function SignIn({ auth, user }) {

    const [signIn, setSignIn] = useState(true);
    const [btnTxt, setBtnTxt] = useState("First time user? Sign up here!");

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const signInWithGoogle = () => {
        // Instantiate Google auth provider
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    // Function to create a new user account with email and password.
    const signUpWithEmail = (e) => {
        e.preventDefault()
        if (password.trim() === confirmPassword.trim()) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    // Signed in 
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                });
        } else {
            alert("Passwords must match")
        }
    }

    // Function to login to an existing user account with email and password.
    const signInWithEmail = (e) => {
        e.preventDefault()
        console.log(email)
    
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    // Signed in 
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // ..
                });
    }

    // Function to toggle the signIn state
    const toggleSignIn = () => {
        if (signIn === true) {
            setSignIn(false)
            setBtnTxt("Have an account? Login here!")

        } else {
            setSignIn(true)
            setBtnTxt("First time user? Sign up here!")
        }
    }

    // Checks if user is logged in and redirects to the root route accordingly
    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <main className='col-md-4 ml-auto mr-auto'>
            <form>
                {/* Input and label for email */}
                <label htmlFor='email'>Email</label>
                <input onChange={(e) => { setEmail(e.target.value) }} className='w-100' id='email' type='email' />

                {/* Input and label for password */}
                <label htmlFor='password'>Password</label>
                <input onChange={(e) => { setPassword(e.target.value) }} className='w-100' id='password' type='password' />

                {/* Password match input and label that only shows up if the user is creating an account */}
                {signIn ?
                    null
                    :
                    <>
                        <label htmlFor='password-match'>Retype Password</label>
                        <input onChange={(e) => { setConfirmPassword(e.target.value) }} className='w-100' id='password-match' type='password' />
                    </>
                }

                {/* Displays login or signup buttons based on user input */}
                {signIn ?
                    <button onClick={signInWithEmail} className='w-100 mt-2' type='submit' value='login'>Login</button>
                    :
                    <button onClick={signUpWithEmail} className='w-100 mt-2' type='submit' value='signup'>Sign Up</button>
                }

            </form>
            <button className='w-100 mt-3' onClick={signInWithGoogle}>Sign in with Google</button>
            <button className='w-100 mt-3' onClick={toggleSignIn}>{btnTxt}</button>
        </main>
    )
}
