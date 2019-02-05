import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from 'store/modules/user'

import Home from 'Layout/Home'

class App extends Component {

	componentDidMount() {
		this.props.UserActions.fetchUser()
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default connect(null, dispatch => ({
	UserActions: bindActionCreators(userActions, dispatch)
}))(App)