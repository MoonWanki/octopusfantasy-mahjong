import React, { Component } from 'react'
import { connect } from 'react-redux'
import socketIOClient from 'socket.io-client'

class Client extends Component {

    state = {
        socket: socketIOClient(`${process.env.REACT_APP_SERVER_URL}/mahjong`),
        isInQueue: false,
        isMatchFound: false,
        isMatchAccepted: false,
        isGameStarted: false,
    }

    componentDidMount() {
        this.state.socket.on('message', msg => console.warn(msg))
        this.state.socket.on('my_info', player => console.log("welcome to mahjong!", player))
        this.state.socket.on('match_found', () => this.setState({ isMatchFound: true }))
        this.state.socket.on('match_declined', () => this.setState({ isMatchFound: false, isMatchAccepted: false }))
        //this.state.socket.on('room_status', players => console.log('room status: ', players))
        this.state.socket.on('game_started', () => this.setState({ isGameStarted: true }))

    }

    render() {
        return (
            <div>
                {this.state.isGameStarted
                    ? '게임 시작!'
                :this.state.isMatchFound
                    ? this.state.isMatchAccepted
                        ? '다른 사람들을 기다리고 있습니다.'
                        : <div>
                            게임을 찾았습니다! 10초 내로 선택하지 않으면 자동 거절!
                            <button onClick={() => {
                                this.state.socket.emit('accept_match')
                                this.setState({ isMatchAccepted: true })
                            }}>수락</button>
                            <button onClick={() => {
                                this.state.socket.emit('decline_match')
                                this.setState({ isMatchFound: false, isMatchAccepted: false, isInQueue: false })
                            }}>거절</button>
                        </div>
                : this.state.isInQueue
                    ? <div>
                        게임을 찾는 중입니다...
                        <button onClick={() => {
                            this.state.socket.emit('leave_queue')
                            this.setState({ isInQueue: false })
                        }}>매칭 취소</button>
                    </div>
                : <button onClick={() => {
                    this.state.socket.emit('enter_queue', { capacity: 4, wind: 1 })
                    this.setState({ isInQueue: true })
                }}>매칭 시작</button>}
            </div>
        )
    }
}

export default connect(
    state => ({
        profile: state.user.profile,
    })
)(Client);