import React, { useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';

export default function SignIn({ auth }) {

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
                // ..
            });
        } else {
            alert("Passwords must match")
        }

        
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

    return (
        <main className='col-md-4 ml-auto mr-auto'>
            <form>
                {/* Input and label for email */}
                <label htmlFor='email'>Email</label>
                <input onChange={(e) => {setEmail(e.target.value)}} className='w-100' id='email' type='email' />

                {/* Input and label for password */}
                <label htmlFor='password'>Password</label>
                <input onChange={(e) => {setPassword(e.target.value)}} className='w-100' id='password' type='password' />

                {/* Password match input and label that only shows up if the user is creating an account */}
                {signIn ?
                    null
                    :
                    <>
                        <label htmlFor='password-match'>Retype Password</label>
                        <input onChange={(e) => {setConfirmPassword(e.target.value)}} className='w-100' id='password-match' type='password' />
                    </>
                }

                {/* Displays login or signup buttons baased on user input */}
                {signIn ?
                    <button className='w-100 mt-2' type='submit' value='login'>Login</button>
                    :
                    <button onClick={signUpWithEmail} className='w-100 mt-2' type='submit' value='signup'>Sign Up</button>
                }

            </form>
            <button className='w-100 mt-3' onClick={signInWithGoogle}>Sign in with Google</button>
            <button className='w-100 mt-3' onClick={toggleSignIn}>{btnTxt}</button>
        </main>
    )
}
