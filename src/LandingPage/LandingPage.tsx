import React, { useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { SubscribeForm } from '../SubscribeForm/SubscribeForm';
import Logo from './assets/Logo';
import DesktopSlider from './DesktopSlider';
import { SocialBox } from './SocialBox/SocialBox';
import './LandingPage.scss';

// NOTE: 4/3 = 1600/1200 aspect ratio taken from images used for desktop slider
function isDesktopDevice(){
    return window.innerWidth / window.innerHeight >= 4/3;
}

export const LandingPage = () => {
    const [isDesktop, setIsDesktop] = useState(true);

    useEffect(()=> {
        setIsDesktop(isDesktopDevice());

        const subscription = fromEvent(window, 'resize')
            .pipe(
                auditTime(300)
            )
            .subscribe(() => {
                setIsDesktop(isDesktopDevice());
            });

        return () => subscription.unsubscribe();
    });

    return (
        <div className={ 'landing-page' + (isDesktop? '': ' is-mobile') }>
            {
                isDesktop && <DesktopSlider />
            }

            <div className="item item-1">
                <Logo />
            </div>

            <div className="announcement item item-2">
                <h1 className="title">People, Events, Epochs... World history on one page</h1>
                <h2 className="title title--large">COMING SOON</h2>
            </div>

            {/* <div className="item item-3">
                <SubscribeForm />
            </div> */}

            {/* <div className="item item-4">
                <SocialBox />
            </div> */}
        </div>
    )
}