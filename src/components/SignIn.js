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

export default class SignIn extends Component {
  state = {
    username: 'jjj@jjj.jj',
    password: 'jjjjjj',
  }

  /**
   * SignInの処理
   */
  onSignIn = () => {
    console.log('onSignIn')
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
    const cognitoUser = getCognitoUser(username, userPool)
    const authenticationDetails = getAuthenticationDetails(username, password)
    console.log('cognito', cognitoUser, authenticationDetails)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: autheresult => {
        console.log('onSuccess')
        location.href='#mypage'
      },
      onFailure: err => {
        console.log('onFailure')
        console.log(err)
        this.setState({ message: 'ログインに失敗しました'})
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log('New Password Requred')
        console.log(userAttributes, requiredAttributes)
        this.setState({ message: 'パスワードを変更してください'})
      }
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
        <h1>SignIn</h1>
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
          label='SignIn'
          onClick={() => this.onSignIn()}
        />
      </div>
    )
  }
}