import React, { Component } from 'react'
import { EventTypes } from '../eventBus';

const defaultStyle = {
    textAlign: 'center',
    marginTop: '20px',
}
const inputStyle = {
    borderRadius: '4px',
    border: 'solid 1px #ddd',
    padding: '5px',
    margin: '5px 10px',
}

class LoginForm extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }    
    saveValues = (key, event)=>{
        this.setState({
            [key]: event.target.value
        })
    }
    userLoggingIn = (e) => {
        e.preventDefault()
        this.props.bus.emit(EventTypes.USER_LOGIN, this.state)
    }
    render(){
        return(
            <div style={defaultStyle}>
                <form onSubmit={this.userLoggingIn}>
                    <input name="login" onKeyUp={this.saveValues.bind(null, 'login')} style={inputStyle} type="text" placeholder="Login"/> <input name="password" onKeyUp={this.saveValues.bind(null, 'password')} style={inputStyle} type="password" placeholder="Password"/><br/>
                    <button style={{ ...inputStyle, padding: '5px 10px'}} type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export {LoginForm}