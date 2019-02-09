import React, { Component } from 'react'

export default class LoginButton extends Component {
	render() {
		return (
			<div>
				<a href={`${process.env.REACT_APP_HOME_URL}/login?url=${encodeURIComponent(window.location.href)}`}>
					<h3>LOGIN</h3>
				</a>
			</div>
		)
	}
}
