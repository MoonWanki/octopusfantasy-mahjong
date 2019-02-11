import React, { Component, Fragment } from 'react'
import { ProfileZone } from 'Components'
import { connect } from 'react-redux'
import './Home.scss'

class Home extends Component {

    render() {
        return (
            <Fragment>
                <h1>문어마장</h1>
                <ProfileZone />
                {this.props.profile &&
                    <a href='/client' target='_blank'>
                        <button>GAME START</button>
                    </a>
                }
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        profile: state.user.profile,
    })
)(Home);