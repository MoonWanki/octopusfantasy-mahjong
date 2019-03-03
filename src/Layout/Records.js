import React, { Component, Fragment } from 'react'
import { Header, Footer } from 'Components'

export default class Records extends Component {
    
    render() {
        return (
            <Fragment>
                <Header />
                <div style={{ width: '100vw', height: '80vh', background: `url(${require('images/bg_tile.jpg')}) center no-repeat`, backgroundSize: 'cover' }}><p style={{ color: 'white', textAlign: 'center', margin: 0, paddingTop: '35vh', fontSize: '5vh', fontWeight: 500 }}>준비중입니다 :)</p></div>
                <Footer />
            </Fragment>
        )
    }
}
