import React, { Component } from 'react'

export default class Mahjong extends Component {

    state = {
        isInQueue: false,
        isMatchFound: false,
        isMatchAccepted: 0, // 1 (accpeted) | 0 (not chosen yet) | -1 (declined)
        isMatchSuccess: false,
        isGameStarted: false,

        connectedPlayers: [],
    }

    constructor(props) {
        super(props)
        props.socket.on('connected_players', players => this.handleConnectedPlayers(players))
        props.socket.on('match_found', () => this.handleMatchFound())
        props.socket.on('match_success', () => this.handleMatchSuccess())
        props.socket.on('match_failed', () => this.handleMatchFailed())
        props.socket.on('game_started', () => this.handleGameStarted())
    }

    handleConnectedPlayers = players => {
        this.setState({ connectedPlayers: players })
    }

    handleMatchFound = () => {
        this.setState({ isMatchFound: true })
    }

    handleMatchSuccess = () => {
        this.setState({ isMatchSuccess: true })
    }

    handleMatchFailed = () => {
        this.setState(state => ({ isMatchFound: false, isMatchAccepted: 0, isInQueue: state.isMatchAccepted===1 }))
    }

    handleGameStarted = () => {
        this.setState({
            isInQueue: false,
            isMatchFound: false,
            isMatchAccepted: 0,
            isMatchSuccess: false,
            isGameStarted: true,
        })
    }

    onEnterQueueButtonClick = mode => {
        this.props.socket.emit('enter_queue', mode)
        this.setState({ isInQueue: true })
    }

    onLeaveQueueButtonClick = () => {
        this.props.socket.emit('leave_queue')
        this.setState({ isInQueue: false })
    }

    onMatchAcceptButtonClick = () => {
        this.props.socket.emit('accept_match', true)
        this.setState({ isMatchAccepted: 1 })
    }

    onMatchDeclineButtonclick = () => {
        this.props.socket.emit('decline_match', false)
        this.setState({ isMatchAccepted: -1, isInQueue: false })
    }

    renderGame() {
        if(this.state.isGameStarted) {
            return <h1>(게임 진행 중...)</h1>
        }
        else if(this.state.isMatchFound) {
            if(this.state.isMatchAccepted)
                return (
                    <div>
                        <h3>{this.state.isMatchAccepted===1 ? '게임 수락됨' : '게임 거절됨'}</h3>
                        <h4>다른 플레이어들을 기다리는 중...</h4>
                    </div>
                )
            else {
                return (
                    <div>
                        <h2>게임을 찾았습니다!</h2>
                        <button onClick={this.onMatchAcceptButtonClick}>수락</button>
                        <button onClick={this.onMatchDeclineButtonclick}>거절</button>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    {this.state.isInQueue
                        ?
                        <div>
                            <h3>게임 찾는 중...</h3>
                            <button onClick={this.onLeaveQueueButtonClick}>취소</button>
                        </div>
                        :
                        <div>
                            <h3>모드를 선택하세요</h3>
                            <button onClick={() => this.onEnterQueueButtonClick({ capacity: 4, wind: 1 })}>4인 마작 동풍전</button>
                            <button onClick={() => this.onEnterQueueButtonClick({ capacity: 4, wind: 2 })}>4인 마작 반장전</button>
                            <button onClick={() => this.onEnterQueueButtonClick({ capacity: 3, wind: 1 })}>3인 마작 동풍전</button>
                            <button onClick={() => this.onEnterQueueButtonClick({ capacity: 3, wind: 2 })}>3인 마작 반장전</button>
                        </div>
                    }
                </div>
            )
        }
        
    }

    render() {
        return (
            <div>
                {this.renderGame()}
                <h3>내정보</h3>
                {this.props.player && <h5>{this.props.player.nickname} R{this.props.player.rate}</h5>}
                <h3>접속 중인 유저</h3>
                {this.state.connectedPlayers.map(player => <p>{player.info.nickname} ({player.isInRoom ? '게임 중' : player.isInQueue ? '게임 찾는 중' : '온라인'})</p>)}
            </div>
        )
    }
}
