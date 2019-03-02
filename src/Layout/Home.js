import React, { Component, Fragment } from 'react'
import { Header, Carousel } from 'Components'
import './Home.scss'

export default class Home extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                <Carousel />
            </Fragment>
        )
    }
}