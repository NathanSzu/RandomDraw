import './App.css';
// import SignIn from './components/SignIn'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import View from './pages/View';
import SignIn from './pages/SignIn';

// Importing firebase SDK
import firebase from 'firebase/app';
// Importing firestore database
import 'firebase/firestore';
// Importing firebase user authentication
import 'firebase/auth';

// Importing firebase hooks to use in react
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // Firebase config data goes here.
  apiKey: "AIzaSyComTYk2QyWd4iJzK7ReXBL2azGd-Vo5gA",
  authDomain: "randomdraw-264a2.firebaseapp.com",
  databaseURL: "https://randomdraw-264a2.firebaseio.com",
  projectId: "randomdraw-264a2",
  storageBucket: "randomdraw-264a2.appspot.com",
  messagingSenderId: "449384473316",
  appId: "1:449384473316:web:fe9013c6557d6d627002f1"
})

// Referencing auth and firestore as global variables
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  // Stores info of currently logged in user as an object
  const [user] = useAuthState(auth);

  const signOutFirebase = () => {
    firebase.auth().signOut().then(() => {

    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="">

      <Router>
        <Route exact path='/' render={() => user ? <View user={user} /> : <Redirect to={'/login'} />} />
        <Route exact path='/login' render={() => <SignIn user={user} auth={auth} />} />
      </Router>

    </div>
  );
}

export default App;
