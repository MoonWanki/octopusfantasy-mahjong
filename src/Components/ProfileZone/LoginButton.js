import React, { Component } from 'react'

export default class LoginButton extends Component {
	render() {
		return (
			<div>
				<a href={`http://localhost:3000/login?url=${encodeURIComponent(window.location.href)}`}>
					<h3>LOGIN</h3>
				</a>
			</div>
		)
	}
}
