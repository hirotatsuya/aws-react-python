/**
 * ユーザ名のバリデーション
 */
const checkUsername = username => {
  console.log('checkUsername')
  let message = ''
  if (username === '') {
    message = 'ユーザ名を入力してください'
  }
  return message
}

/**
 * パスワードのバリデーション
 */
const checkPassword = password => {
  console.log('checkPassword')
  let message = ''
  if (password === '') {
    message = 'パスワードを入力してください'
  } else if (password.length < 6) {
    message = 'パスワードは6文字以上です'
  }
  return message
}

export {
  checkUsername,
  checkPassword,
}