import AWS from 'aws-sdk'
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import apigClientFactory from 'aws-api-gateway-client'
import { config } from '../config'

/**
 * CognitoのUserPoolの取得
 */
const getUserPool = () => {
  console.log('getUserPool')
  const userPoolData = {
    UserPoolId: config.USER_POOL_ID,
    ClientId: config.APP_CLIENT_ID,
  }
  let userPool = new CognitoUserPool(userPoolData)
  return userPool
}

/**
 * CognitoUserの取得
 */
const getCognitoUser = (username, userPool) => {
  console.log('getCognitoUser', username, userPool)
  const cognitoUserData = {
    Username: username,
    Pool: userPool,
  }
  let cognitoUser = new CognitoUser(cognitoUserData)
  return cognitoUser
}

/**
 * AuthenticationDetailsの取得
 */
const getAuthenticationDetails = (username, password) => {
  console.log('getAuthenticationDetails', username, password)
  const authenticationData = {
    Username: username,
    Password: password,
  }
  let authenticationDetails = new AuthenticationDetails(authenticationData)
  return authenticationDetails
}

/**
 * ApigClientの取得
 */
const getApigClient = () => {
  console.log('getApigClient')
  const apiClientConfig = {
    invokeUrl: config.INVOKE_URL + 'send_slack_news'
  }
  const apigClient = apigClientFactory.newClient(apiClientConfig)
  return apigClient
}

export {
  getUserPool,
  getCognitoUser,
  getAuthenticationDetails,
  getApigClient,
}