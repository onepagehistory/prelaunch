import * as React from 'react';
import Logo from './assets/Logo'
import './LandingPage.scss';

import image from './assets/slide-1.png';
import image2 from './assets/slide-2.png';
import image3 from './assets/slide-3.png';
const arrSrc = [image, image2, image3];

const SLICE_COUNT = 12;
const sliceArrayHelper = new Array(SLICE_COUNT).fill(undefined);
export class LandingPage extends React.Component<{},any> {
    sliderRef = React.createRef<HTMLDivElement>();
    slicesRefs = sliceArrayHelper.map(()=> React.createRef<HTMLImageElement>());

    componentDidMount(){
        let i = 0;
        const shoNextImage = () => {
            if (i >= arrSrc.length) {
                i = 0;
            }

            const imgSrc = arrSrc[i];
            this.showImage(imgSrc);
            i++;
            setTimeout(shoNextImage, 3000);
        }

        setTimeout(shoNextImage, 1000);
    }

    showImage(imgSrc) {
        this.sliderRef.current.classList.remove('slide-in');
        this.sliderRef.current.classList.add('slide-out');
        this.slicesRefs.forEach((ref, i) => {
                ref.current.style.left = '-' + i * 100 + '%';
                ref.current.src = imgSrc;
        })

        setTimeout(()=>{
            this.sliderRef.current.classList.add('slide-in');
            this.sliderRef.current.classList.remove('slide-out');
        }, 2500)
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
                    <h2>Events, People, Ages... New Look at the history</h2>
                    <h1>COOMING SOON</h1>
                </div>
                <div className="item item-3">
                    Follow us: icon icon icon
                </div>
            </div>
        )
    }
    
}