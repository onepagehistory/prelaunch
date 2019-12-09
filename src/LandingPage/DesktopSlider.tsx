import * as React from 'react';
import { asyncScheduler, EMPTY, merge, Observable, of, scheduled, Subject, timer, zip } from 'rxjs';
import { catchError, concatMap, delay, ignoreElements, mergeMap, repeat, retry, shareReplay, takeUntil, tap } from 'rxjs/operators';
import './DesktopSlider.scss';
import image1 from './assets/images/slide-1-min.png';
import image2 from './assets/images/slide-2-min.png';
import image3 from './assets/images/slide-3-min.png';


const imageSources = [image1, image2, image3];

const SLIDE_DELAY = 3200;
const SLIDE_GAP = 1000;
const SLICE_COUNT = 10;
const sliceArrayHelper = new Array(SLICE_COUNT).fill(undefined);

export default class DesktopSlider extends React.Component<{},any> {
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
                // enforing async for repeat() to work
                scheduled(images$, asyncScheduler).pipe(
                    // loop the slider
                    repeat(),
                    // ensure images are spaced at least with SLIDE_DELAY time
                    concatMap((img$, index) => {
                        // show the lines animation before the first slide
                        if (index == 0) {
                            return img$.pipe(
                                tap(() => this.showLines()),
                                delay(500)
                            )
                        }

                        // following slides would have at least SLIDE_DELAY delay
                        return zip(timer(SLIDE_DELAY), img$, (_, img) => img)
                    }),
                    // hide previous image
                    tap(()=> this.hideImage()),
                    // delay displaying new image for slide-out animation
                    delay(SLIDE_GAP),
                    // show the next image
                    tap((src)=> this.showImage(src)),
                )
            ),
            takeUntil(this.destroy$)
        ).subscribe() // empty subscription: doing work in `tap`s
    }

    showLines(){
        if (!this.sliderRef.current) {
            return;
        }

        this.sliderRef.current.classList.add('lines');
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
            <div className="slider" ref={this.sliderRef}>{
                sliceArrayHelper.map((_, i) =>
                    <div key={i} className="slide-wrapper">
                        <div className="img-wrapper">
                            <img ref={ this.slicesRefs[i] } className="img" />
                        </div>
                    </div>
                )
            }</div>
        )
    }
}