import React from 'react';
import ReactDOM from 'react-dom';
import FireBaseApp from './Components/FireBaseApp';
import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
  authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
  projectId: "hmc-cs124-fa21-labs",
  storageBucket: "hmc-cs124-fa21-labs.appspot.com",
  messagingSenderId: "949410042946",
  appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function render() {
  ReactDOM.render(
    <React.StrictMode>
      {/* <InMemoryApp initialData={initialData} /> */}
      <FireBaseApp db={db} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

render();