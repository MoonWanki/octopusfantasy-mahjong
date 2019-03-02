import React, { Component } from 'react'
import './LoginButton.scss'

export default class LoginButton extends Component {
	render() {
		return (
			<a href={`${process.env.REACT_APP_HOME_URL}/login?url=${encodeURIComponent(window.location.href)}`}>
				<div className='login-button'>로그인</div>
			</a>
		)
	}
}
