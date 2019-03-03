import React, { Component } from 'react'
import './index.scss'

import { IconButton, Icon } from '@material-ui/core'

import carouselImage1 from 'images/carousel_1.jpg'
import carouselImage2 from 'images/carousel_2.jpg'

const duration = 15

const carouselItems = [
    <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage1})`}}>
        <p className='carousel-item-text carousel-item-text-title'><span style={{ fontWeight: 500 }}>오프닝 시즌 종료</span></p>
        <p className='carousel-item-text'>지금 바로 순위를 확인하세요!</p>
    </div>,
    <div className='carousel-item' style={{ backgroundImage: `url(${carouselImage2})`}}>
        <p className='carousel-item-text carousel-item-text-title'><span style={{ fontWeight: 500 }}>문어마장 아주대점 오픈!</span></p>
        <p className='carousel-item-text'>아주대에서 단 <span style={{ fontWeight: 500 }}>5분</span> 거리.</p>
    </div>,
]

let slidingTimer = null

export default class Carousel extends Component {

    state = {
        current: 0,
        progress: 0,
    }

    componentDidMount() {
        slidingTimer = setTimeout(this.runProgress, duration)
    }

    componentWillUnmount() {
        clearTimeout(slidingTimer)
    }

    runProgress = () => {
        if(this.state.progress < 100) {
            this.setState({ progress: this.state.progress + 0.4 }, () => {slidingTimer = setTimeout(this.runProgress, duration)})
        }
        else {
            this.toNext()
        }
    }

    toPrev = () => this.toNth(this.state.current===0 ? carouselItems.length - 1 : this.state.current - 1)

    toNext = () => this.toNth(this.state.current < carouselItems.length - 1 ? this.state.current + 1 : 0)
    
    toNth = n => {
        clearTimeout(slidingTimer)
        this.setState({ current: n, progress: 0 })
        
        slidingTimer = setTimeout(this.runProgress, duration)
    }

    render() {
        return (
            <div className='carousel'>

                {carouselItems.map((carouselItem, i) => 
                    <span key={i} className={this.state.current===i ? 'carousel-active' : 'carousel-inactive'}>
                        {carouselItem}
                    </span>
                )}

                <div className='carousel-arrows'>
                    <IconButton onClick={this.toPrev}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_before</Icon></IconButton>
                    <IconButton onClick={this.toNext}><Icon style={{ fontSize: 30, color: 'white'}}>navigate_next</Icon></IconButton>
                </div>

                <div className='carousel-navigator'>
                    {carouselItems.map((_, i) =>
                        <div
                            key={i}
                            onClick={this.state.current===i ? null : () => this.toNth(i)}
                            className='carousel-navigator-button'
                            style={this.state.current===i ? { opacity: 0.8 } : { cursor: 'pointer' }} />
                    )}
                </div>

                <div className='carousel-progress-bar' style={{ width: `${this.state.progress > 100 ? 100 : this.state.progress}%` }} />
            </div>
        )
    }
}
