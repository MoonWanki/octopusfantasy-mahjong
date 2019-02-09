import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

import Home from 'Layout/Home'
import Client from 'Client'

class App extends Component {

	componentDidMount() {
		this.props.UserActions.fetchUser()
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/client" component={Client} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default connect(null, dispatch => ({
	UserActions: bindActionCreators(userActions, dispatch)
}))(App)