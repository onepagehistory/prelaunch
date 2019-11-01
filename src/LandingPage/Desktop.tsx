import { merge, Observable, of, Subject, from, zip, timer, EMPTY } from 'rxjs';
import * as React from 'react';

import { shareReplay, ignoreElements, mergeMap, concatMap, repeat, takeUntil, tap, delay, retry, catchError } from 'rxjs/operators';
import Logo from './assets/Logo';
import Social from './social-media/Social'
import './LandingPage.scss';

import image1 from './assets/images/slide-1.png';
import image2 from './assets/images/slide-2.png';
import image3 from './assets/images/slide-3.png';

const imageSources = [image1, image2, image3];

const SLIDE_DELAY = 3000;
const SLICE_COUNT = 12;
const sliceArrayHelper = new Array(SLICE_COUNT).fill(undefined);

export default class LandingPage extends React.Component<{},any> {
    sliderRef = React.createRef<HTMLDivElement>();
    slicesRefs = sliceArrayHelper.map(()=> React.createRef<HTMLImageElement>());
    destroy$ = new Subject<void>();

    componentDidMount() {
        // turn image load into observable
        const images$ = imageSources.map(src =>
            new Observable(observer => {
                const imageElement = document.createElement('img');
                imageElement.addEventListener('load', () => {
                    observer.next(src);
                    observer.complete();
                });

                imageElement.addEventListener('error', () => {
                    // error will be handled below
                    observer.error();
                });

                imageElement.src = src;
            })
            .pipe(
                // retry 3 times
                retry(3),
                // if an error occurs -- skip the image
                catchError(() => EMPTY),
                // we only need to load it once
                shareReplay(1)
            )
        );

        merge(
            of(void 0),
            // a hack to force images to start loading immediately
            ...images$.map(img$ => img$.pipe(ignoreElements()))
        ).pipe(
            mergeMap(() =>
                from(images$)
                .pipe(
                    // ensure images are spaced at least with SLIDE_DELAY time
                    concatMap(img$ => zip(timer(SLIDE_DELAY), img$, (_, img) => img)),
                    // hide previous image
                    tap(()=> this.hideImage()),
                    // delay displaying new image for slide-out animation
                    delay(500),
                    // loop the slider
                    repeat()
                )
            ),
            takeUntil(this.destroy$)
        ).subscribe(src => this.showImage(src))
    }

    showImage(imgSrc) {
        this.sliderRef.current.classList.remove('slide-in');
        this.sliderRef.current.classList.add('slide-out');
        this.slicesRefs.forEach((ref, i) => {
            ref.current.style.left = '-' + i * 100 + '%';
            ref.current.src = imgSrc;
        })
    }

    hideImage() {
        this.sliderRef.current.classList.add('slide-in');
        this.sliderRef.current.classList.remove('slide-out');
    }

    componentWillUnmount(){
        this.destroy$.next(void 0);
    }

    render(){
        return (
            <div className="landing-page">
                <div className="item item-1">
                    <Logo/>
                </div>
                <div className="slider" ref={this.sliderRef}>{
                    sliceArrayHelper.map((_, i) =>
                        <div key={i} className="wrap">
                            <div className={'img-wrapper'}>
                                <img ref={ this.slicesRefs[i] } className={ 'splitted-image' } />
                                </div>
                            </div>
                        )}
                </div>
                <div className="item item-2">
                    <h2 className="title">Events, People, Ages... New Look at the history</h2>
                    <h1 className="title title--large">COOMING SOON</h1>
                </div>
                <div className="item item-3">
                    <Social/>
                </div>
            </div>
        )
    }
}