import * as firebase from 'firebase/app';
import 'firebase/firestore';
import React, { useMemo, useState } from 'react';
import './SubscribeForm.scss';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDavq8njDQdVgYP5piWiRqPz_JIobjeaEc",
    authDomain: "world-history-page.firebaseapp.com",
    databaseURL: "https://world-history-page.firebaseio.com",
    projectId: "world-history-page",
    storageBucket: "world-history-page.appspot.com",
    messagingSenderId: "603468501657",
    appId: "1:603468501657:web:ab802dfc323ea799"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const subscribers = db.collection('subscribers');


export const SubscribeForm = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState(null);

    const onSubmit = useMemo(() => 
        ((event: React.FormEvent) => {
            event.preventDefault();
            event.stopPropagation();

            const email = event.target['email'].value;
            setLoading(true);

            subscribers.add({ email })
                .then(
                    () => {
                        setLoading(false);
                        setSuccess(true);
                        setSubmittedEmail(email);
                    }
                    , () => {
                        setLoading(false);
                        setError(true);
                    }
                )
        })
    , [ ]);

    return (
        <div className="subscribe-form">
            { !isLoading
            ? <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Enter your email" />
                <button type="submit">subscribe</button>
              </form>
            : null
            }

            { isLoading
            ? <span>submitting...</span>
            : null }

            { isError
            ? <span>Please, try again later</span>
            : null }

            { isSuccess
            ? <span>submitted {submittedEmail}</span>
            : null }
        </div>
    )
}