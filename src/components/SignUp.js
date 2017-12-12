import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { getUserPool, getCognitoUser, getAuthenticationDetails } from './utils-aws'
import { checkUsername, checkPassword } from './utils'

const styles = {
  message: {
    color: 'red',
  }
}

export default class SignUp extends Component {
  state = {
    username: '',
    password: '',
  }

  /**
   * SignInの処理
   */
  onSignUp = () => {
    console.log('onSignUp')
    const { username, password } = this.state
    let message = ''
    message = checkUsername(username)
    if (message !== '') {
      this.setState({ message: message })
      return
    } else {
      message = checkPassword(password)
    } if (message !== '') {
      this.setState({ message: message })
      return
    }
    const userPool = getUserPool()
    userPool.signUp(username, password, null, null, (err, result) => {
      if (err) {
        console.log(err)
        return
      }
      const cognitoUser = result.user
      console.log('user name is', cognitoUser)
    })
  }

  render() {
    const {
      username,
      password,
      message,
    } = this.state

    return (
      <div>
        <h1>SignUp</h1>
        {message !== '' ? <div style={styles.message}>{message}</div> : null}
        <TextField
          hintText='email'
          floatingLabelText='email'
          value={username}
          onChange={e => this.setState({username: e.target.value})}
        />
        <br />
        <TextField
          type='password'
          hintText='password'
          floatingLabelText='password'
          value={password}
          onChange={e => this.setState({password: e.target.value})}
          />
        <br />
        <br />
        <RaisedButton
          label='SignUp'
          onClick={() => this.onSignUp()}
        />
        <span> </span>
        <RaisedButton
          label='RETURN'
          onClick={() => location.href='#mypage'}
        />
      </div>
    )
  }
}