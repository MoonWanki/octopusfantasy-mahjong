import React, { Component } from 'react'
import './index.scss'

export default class NoticePreviewer extends Component {

    render() {
        return (
            <div className="notice-previewer">
                <div className='notice-previewer-title'>
                    공지사항
                </div>
                <div className='notice-previewer-list'>
                    공지사항이 없습니다.
                </div>
            </div>
        )
    }
}