import * as React from 'react';

import Logo from './assets/Logo'
import './LandingPage.scss';
import image from './assets/bg.png';

export const LandingPage = () => {
    return (
        <div className="landing-page">
            <Logo/>
            <img className="bg-image" src={image} alt="sdf"/>
        </div>
    )
}

