import React, { Component } from 'react'
import { EventTypes } from '../eventBus';

const defaultStyle = {
    textAlign: 'center',
    marginTop: '20px',
}
const inputStyle = {
    borderRadius: '4px',
    border: 'solid 1px #ddd',
    padding: '5px 10px',
    margin: '5px 10px',
    width:'191px',
    height:'46px',
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

  signInWithGoogle = () => {
    this.props.bus.emit(EventTypes.USER_GOOGLE_LOGIN)
  }

  render(){
    return(
      <div style={defaultStyle}>
        <form id="loginForm" onSubmit={this.userLoggingIn}>
          <input id="login" name="login" onKeyUp={this.saveValues.bind(null, 'login')} style={inputStyle} type="text" placeholder="Login"/> <input id="password" name="password" onKeyUp={this.saveValues.bind(null, 'password')} style={inputStyle} type="password" placeholder="Password"/><br/>
          <button style={{ ...inputStyle, padding: '5px 10px'}} type="submit">Login</button>
          <hr/>
          <button type="button" id="signInWithGoogle" onClick={this.signInWithGoogle} />
        </form>
      </div>
    )
  }
}

export {LoginForm}
