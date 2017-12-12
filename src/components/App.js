import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import MyPage from './MyPage'

const styles = {
  root: {
    padding: '1vh 1vw',
    width: '98vw',
  },
}

export default class App extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/mypage' component={MyPage} />
        </Switch>
      </div>
    )
  }
}