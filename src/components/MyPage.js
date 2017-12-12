import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { getUserPool, getCognitoUser, getAuthenticationDetails, getApigClient } from './utils-aws'
import { config } from '../config'
import req from 'superagent'


export default class MyPage extends Component {
  state = {
    text: '',
  }
  componentWillMount = () => {
    this.cognitoUser = this.signInCheck()
  }

  /**
   * ログイン状態の確認
   */
  signInCheck = () => {
    const userPool = getUserPool()
    const cognitoUser = userPool.getCurrentUser()
    console.log('cognitoUser', cognitoUser)
    if (!cognitoUser) {
      location.href = '#'
      return
    }
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log(err)
        location.href = '#'
        return
      }
      if (session) {
        console.log(session)
        // getUserAttributes
      }
    })
    return cognitoUser
  }

  /**
   * superagentによるAPI GatewayへのアクセスをトリガーとするLambdaの発火
   */
  onCallApiBySuperAgent = () => {
    console.log('onCallApiBySuperAgent')
    req.get(config.INVOKE_URL + 'send_slack_news')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('err', err)
          return
        }
        console.log('res', res)
      })
  }

  /**
   * aws-api-gateway-clientによるAPI GatewayへのアクセスをトリガーとするLambdaの発火
   */
  onCallApiByApigClient = () => {
    console.log('onCallApiByApigClient')
    const apigClient = getApigClient()
    const params = {}
    const pathTemplate = '/'
    const method = 'GET'
    const additionalParams = {}
    const body = {}
    apigClient.invokeApi(
      params,
      pathTemplate,
      method,
      additionalParams,
      body
    ).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * singout処理
   */
  onSignOut = () => {
    this.cognitoUser.signOut()
    location.href = '#'
  }

  /**
   * Lambdaからresponseを受け取る処理
   */
  getPrice = () => {
    console.log('getPrice')
    req.get(config.INVOKE_URL + 'getnews')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if (err) {
          console.log('err', err)
          return
        }
        console.log('res', res)
        const text = res.text
        this.setState({ text: text })
      })
  }

  render() {
    const {
      text,
    } = this.state

    return (
      <div>
        <h1>MyPage</h1>
        <RaisedButton
          label='SignUp'
          onClick={() => location.href='#signup'}
        />
        <span> </span>
        <RaisedButton
          label='SignOut'
          onClick={() => this.onSignOut()}
        />
        <hr />
        <RaisedButton
          label='CallAPI(apigClient)'
          onClick={() => this.onCallApiByApigClient()}
        />
        <span> </span>
        <RaisedButton
          label='CallAPI(superagent)'
          onClick={() => this.onCallApiBySuperAgent()}
        />
        <hr />
        <RaisedButton
          label='CallAPI(getPrice)'
          onClick={() => this.getPrice()}
        />
        <div>response: {text !== '' ? <span>{text}</span> : null}</div>
      </div>
    )
  }
}