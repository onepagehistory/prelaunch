import React, { useState, useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import Desktop from './Desktop'
import Mobile from './Mobile';

function isDesktopDevice(){
    return window.innerWidth / window.innerHeight >= 1600 / 1200;
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

    return isDesktop ? <Desktop /> : <Mobile />
}