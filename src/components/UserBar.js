import React, { Component } from 'react'
import {LoginForm} from './LoginForm'
import {EventTypes} from '../eventBus'

const defaultStyle = {
  textAlign: 'center',
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const inputStyle = {
  borderRadius: '4px',
  border: 'solid 1px #ddd',
  padding: '5px',
  margin: '5px 10px',

}
class UserBar extends Component{

  logout = () => {
    this.props.bus.emit(EventTypes.USER_LOGOUT)
  }

  render() {
    const {user} = this.props
    return (
      <div style={defaultStyle} className="userBar">
        {!user &&
         <LoginForm {...this.props}/> }
        {user && user.email &&
          <div style={defaultStyle} className="">
            {user.photoURL &&
              <img style={{width: '46px', margin: '10px', borderRadius: '50%'}} src={user.photoURL} alt={user.displayName || user.email}/>
            }
            <span>{user.displayName || user.email}</span>
            <button style={{ ...inputStyle, padding: '10px'}}
              onClick={this.logout}>Logout
            </button>
          </div>
        }
      </div>
    )
  }
}

export {UserBar}
