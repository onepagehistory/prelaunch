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
                <input name="email" required className="subscribe-form__input" type="email" placeholder="Enter your email to subscribe" />
                <button className="subscribe-form__button" type="submit">
                <svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="WH-prelaunch-landing" transform="translate(-853.000000, -690.000000)" fill="#FFFFFF" fillRule="nonzero">
                            <g id="arrow_forward-24px" transform="translate(846.000000, 683.000000)">
                                <polygon id="Path" points="21 7 18.5325 9.4675 28.2975 19.25 7 19.25 7 22.75 28.2975 22.75 18.5325 32.5325 21 35 35 21"></polygon>
                            </g>
                        </g>
                    </g>
                </svg>
                </button>
              </form>
            : null
            }

            { isLoading
            ? <span className="subscribe-form__context">Submitting...</span>
            : null }

            { isError
            ? <span className="subscribe-form__context">Please, try again later</span>
            : null }

            { isSuccess
            ? <span className="subscribe-form__success">Submitted {submittedEmail}
                <svg id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32" height="32" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" ><g><path d="M13.0019531,22.4990234c-0.2558594,0-0.5117188-0.0976563-0.7070313-0.2929688l-5.0019531-5.0019531   c-0.390625-0.390625-0.390625-1.0234375,0-1.4140625s1.0234375-0.390625,1.4140625,0l4.2949219,4.2949219L23.2929688,9.7939453   c0.390625-0.390625,1.0234375-0.390625,1.4140625,0s0.390625,1.0234375,0,1.4140625L13.7089844,22.2060547   C13.5136719,22.4013672,13.2578125,22.4990234,13.0019531,22.4990234z"/></g></svg>
            </span>
            : null }
        </div>
    )
}