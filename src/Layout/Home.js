import React, { Component, Fragment } from 'react'
import { ProfileZone } from 'Components'
import './Home.scss'

class Home extends Component {
    render() {
        return (
            <Fragment>
                <h1>문어마장</h1>
                <ProfileZone />
            </Fragment>
        );
    }
}

export default Home;