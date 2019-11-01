import React from 'react';
import Logo from './assets/Logo'
import Social from './social-media/Social'


export const Mobile = () => {
    return (
        <div className="landing-page is-mobile">
            <Logo/>

            <div className="announcment">
                <h2 className="title">Events, People, Ages... New Look at the history</h2>
                <h1 className="title title--large">COOMING SOON</h1>
            </div>

            <Social/>
        </div>
    )
}

export default Mobile