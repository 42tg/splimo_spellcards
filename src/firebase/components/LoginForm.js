import React, { Component } from 'react'
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
    this.props.login(this.state.login, this.state.password)
  }

  signInWithGoogle = () => {
    this.props.loginWithGoogle()
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
