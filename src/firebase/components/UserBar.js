import React, { Component } from 'react'
import {LoginForm} from './LoginForm'

const defaultStyle = {
  textAlign: 'center',
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
  constructor(props){
    super(props)
    console.log(props)
  }
  logout = () => {
    this.props.logout()
  }

  render() {
    const {user} = this.props
    return (
      <div style={{...defaultStyle, flexDirection: 'column'}}className="userBar">
        {!user.email &&
         <LoginForm {...this.props}/> }
        {user.email &&
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
        {user && user.email &&
          <hr style={{ width: '100%', border: '1px solid #ddd', marginBottom: '10px'}}/>
        }
      </div>
    )
  }
}

export {UserBar}
