import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Home, Guide, Leaderboard, Records, NotFound } from 'Layout'
import Client from 'Client'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

class App extends Component {

	componentDidMount() {
		this.props.UserActions.fetchUser()
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/guide" component={Guide} />
					<Route path="/leaderboard" component={Leaderboard} />
					<Route path="/Records" component={Records} />
					<Route path="/client" component={Client} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default connect(
	null,
	dispatch => ({
		UserActions: bindActionCreators(userActions, dispatch)
	})
)(App)