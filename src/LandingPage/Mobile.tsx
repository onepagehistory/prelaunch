import React from 'react';
import Logo from './assets/Logo'
import Social from './social-media/Social'
import { SubscribeForm } from '../SubscribeForm/SubscribeForm';


export const Mobile = () => {
    return (
        <div className="landing-page is-mobile">
            <Logo/>

            <div className="announcement">
                <h2 className="title">People, Events, Epochs... A new look at the history</h2>
                <h1 className="title title--large">COMING SOON</h1>
            </div>

            <div>
                <SubscribeForm />
            </div>

            <Social/>
        </div>
    )
}

export default Mobile