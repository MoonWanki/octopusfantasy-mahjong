import React, { Component } from 'react'
import Mahjong from './Mahjong'
import socketIOClient from 'socket.io-client'
import { signUpToMahjong } from 'utils/api'

class Client extends Component {

    socket = socketIOClient(`${process.env.REACT_APP_SERVER_URL}/mahjong`)

    state = {
        player: null,

        isWelcomed: false,
        isUnregistered: false,
        isAlreadyConnected: false,
        isDBError: false,
        
        nickname: '',
        isSigningUp: false,
    }
    
    constructor(props) {
        super(props)
        this.socket.on('welcome', player => this.handleWelcome(player))
        this.socket.on('message', msg => console.log(msg))
        this.socket.on('unauthorized', () => this.handleUnauthorizedUser())
        this.socket.on('unregistered', () => this.handleUnregisteredUser())
        this.socket.on('already_connected', () => this.handleAlreadyConnectedUser())
        this.socket.on('db_error', err => this.handleDBError(err))
    }

    handleWelcome = player => this.setState({ isWelcomed: true, player: player })

    handleUnauthorizedUser = () => window.location.replace(`${process.env.REACT_APP_HOME_URL}/login?url=${encodeURIComponent(window.location.href)}`)

    handleSignUp = () => {
        this.setState({ isSigningUp: true }, () => {
            if(this.state.nickname.length > 0) {
                signUpToMahjong(this.state.nickname)
                .then(res => {
                    if(res.data) window.location.reload()
                    else this.handleDBError("sign up failed")
                }).catch(err => this.handleDBError(err))
            }
            else {
                alert('닉네임을 입력해주세요!')
            }
        })
    }

    handleUnregisteredUser = () => this.setState({ isUnregistered: true })

    handleAlreadyConnectedUser = () => this.setState({ isAlreadyConnected: true })

    handleDBError = err => {
        this.setState({ isDBError: true })
        if(err) alert(err)
    }

    render() {
        return (
            <div>
                {this.state.isWelcomed && <Mahjong socket={this.socket} player={this.state.player} />}
                {this.state.isUnregistered &&
                    <div>
                        <h1>문어마장에 오신 걸 환영합니다! 닉네임을 정해주세요</h1>
                        {!this.state.isSigningUp ?
                            <div>
                                <input placeholder='닉네임' onChange={e => this.setState({ nickname: e.target.value })} />
                                <button onClick={this.handleSignUp}>등록</button>
                            </div>
                        : <h4>등록 중입니다. 잠시만 기다려주세요...</h4>}
                    </div>
                }
               {this.state.isAlreadyConnected && <h1>이미 접속 중입니다!</h1>}
               {this.state.isDBError && <h1>문제가 발생했습니다! 다시 접속해주세요.</h1>}
            </div>
        )
    }
}

export default Client