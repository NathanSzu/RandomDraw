import './App.css';
// import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import All from './pages/All';
import Favorites from './pages/Favorites';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'

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
      {/* <nav className="row">
        <div className="col-4">
          {user ? <button onClick={signOutFirebase}>Sign Out</button> : null}
        </div>
        <div className="col-4">
          <img />
        </div>
        <div className="col-4">
          {user ? <button onClick={signOutFirebase}>Sign Out</button> : null}
        </div>
      </nav> */}

      <Router>
        <Route exact path='/' component={user ? Favorites : SignIn} />
        <Route exact path='/all' component={user ? All : SignIn} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
      </Router>

      {/* {user ? <h1>logged in</h1> : <SignIn auth={auth} />} */}
    </div>
  );
}

export default App;
