import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AuthHandler from '../utils/AuthHandler'

export default class LogoutComponent extends Component {
    render() {
        AuthHandler.logOutUser();
        return (
            <Redirect to='/' />
        )
    }
}
