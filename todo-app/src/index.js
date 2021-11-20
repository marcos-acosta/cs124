import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyAZ7Q00Z5zGKg2DOwM4qGRsPRgbRIsAoRw",
  authDomain: "todosquid-adb18.firebaseapp.com",
  projectId: "todosquid-adb18",
  storageBucket: "todosquid-adb18.appspot.com",
  messagingSenderId: "650094165810",
  appId: "1:650094165810:web:ed005ab5e0d9790ae4212b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App db={db} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();