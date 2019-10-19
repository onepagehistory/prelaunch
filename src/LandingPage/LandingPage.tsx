import * as React from 'react';

import Logo from './assets/Logo'
import './LandingPage.scss';
import image from './assets/bg.png';

const image2 = 'http://pngimg.com/uploads/yuri_gagarin/yuri_gagarin_PNG65808.png';
const arrImgSrc = [image, image2];
const SLICE_COUNT = 12;
const sliceArrayHelper = new Array(SLICE_COUNT).fill(undefined);
export class LandingPage extends React.Component<{},any> {
    sliderRef = React.createRef<HTMLDivElement>();
    slicesRefs = sliceArrayHelper.map(()=> React.createRef<HTMLImageElement>());

    componentDidMount(){
        const width = this.sliderRef.current.offsetWidth;
        const sliceWidth = width / SLICE_COUNT;
        const imgPosition = -sliceWidth;
        const items = [];

        this.slicesRefs.forEach((ref, i) => {
            const imgPosDynamic = imgPosition * i;
                ref.current.style.objectPosition = imgPosDynamic + 'px';
                ref.current.src = image;
        })
        setTimeout(()=>{
            this.sliderRef.current.classList.add('slide-in');
        }, 2000)
    }

    render(){
        return (
            <div className="landing-page">
                <Logo/>
                <div className="slider" ref={this.sliderRef}>{
                    sliceArrayHelper.map((_, i) =>
                        <div key={i} className="img-wrapper" style={{ left: (100 / 12) * i + '%' }}>
                           <img ref={ this.slicesRefs[i] } className={ 'splitted-image' + ' splitted-image--' + i} /></div>)}</div>
            </div>
        )
    }
    
}