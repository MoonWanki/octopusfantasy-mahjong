import React, { Component } from 'react'
import { IconButton, Icon, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProfileZone } from 'Components'
import './index.scss'

class Header extends Component {

    state = {
        drawerOn: false,
    }

    onGameStart = () => {
        if(this.props.isSignedIn) {
            window.open('/client')
        }
        else {
            alert('로그인이 필요한 서비스입니다.')
            window.location.href = `${process.env.REACT_APP_HOME_URL}/login?url=${encodeURIComponent(window.location.href)}`
        }
    }

    render() {
        return (
            <div className='header'>
                <div className='header-global'>
                    <a href='https://www.octopusfantasy.com'><div className='header-home-logo' /></a>
                    <ProfileZone />
                </div>
    
                <div className='header-main'>
                    <div className='header-main-inner'>
                        <div className='header-desktop'>
                            <div className='header-desktop-nav'>
                                <Link className='header-desktop-logo' to='/' />
                                <Link className='header-desktop-nav-item' to='/guide'>마장 정보</Link>
                                <Link className='header-desktop-nav-item' to='/leaderboard'>랭킹</Link>
                                <Link className='header-desktop-nav-item' to='/records'>전적</Link>
                            </div>
                            <div className='header-desktop-gamestart-button' onClick={this.onGameStart}>GAME<br />START</div>
                        </div>
    
                        <div className='header-mobile'>
                            <IconButton style={{ margin: 10, padding: 10 }} onClick={() => this.setState({ drawerOn: !this.state.drawerOn })}>
                                <Icon style={{ fontSize: 20, color: 'white' }}>{this.state.drawerOn ? 'close' : 'menu'}</Icon>
                            </IconButton>
                            <Link className='header-mobile-logo' to='/' />
                            <IconButton style={{ margin: 10, padding: 10, background: 'orange' }} onClick={this.onGameStart}>
                                <Icon style={{ fontSize: 20 }}>play_arrow</Icon>
                            </IconButton>
                        </div>
                    </div>
                </div>
    
                <div className='header-drawer' style={{ top: this.state.drawerOn ? 84 : -150 }}>
                    <Link to='/guide'>
                        <ListItem button onClick={() => this.setState({ drawerOn: false })}>
                            <ListItemIcon>
                                <Icon>info</Icon>
                            </ListItemIcon>
                            <ListItemText primary="마장 정보" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to='/leaderboard'>
                        <ListItem button onClick={() => this.setState({ drawerOn: false })}>
                            <ListItemIcon>
                                <Icon>equalizer</Icon>
                            </ListItemIcon>
                            <ListItemText primary="랭킹" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to='/records'>
                        <ListItem button onClick={() => this.setState({ drawerOn: false })}>
                            <ListItemIcon>
                                <Icon>view_list</Icon>
                            </ListItemIcon>
                            <ListItemText primary="전적" />
                        </ListItem>
                    </Link>
                    <Divider />
                </div>
    
            </div>
        )
    }
}

export default connect(
    state => ({
        isSignedIn: state.user.isSignedIn,
        profile: state.user.profile,
    })
)(Header);