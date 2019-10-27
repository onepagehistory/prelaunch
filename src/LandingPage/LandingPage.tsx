import * as React from 'react';
import Logo from './assets/Logo'
import './LandingPage.scss';

import image from './assets/bg.png';
const image2 = 'http://pngimg.com/uploads/yuri_gagarin/yuri_gagarin_PNG65808.png';
const arrSrc = [image, image2];

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
            setTimeout(shoNextImage, 3500);
        }

        setTimeout(shoNextImage, 1000);
    }

    showImage(imgSrc) {
        this.sliderRef.current.classList.remove('slide-in');
        this.sliderRef.current.classList.add('slide-out');
        const width = this.sliderRef.current.offsetWidth;
        const sliceWidth = width / SLICE_COUNT;
        const imgPosition = -sliceWidth;
        this.slicesRefs.forEach((ref, i) => {
                const imgPosDynamic = imgPosition * i;
                ref.current.style.width = '1200%';
                ref.current.style.position = 'relative';
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