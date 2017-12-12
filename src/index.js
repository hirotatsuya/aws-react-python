import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import './styles/main.css'
import App from './components/App'

ReactDOM.render(
  <div>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <App />
      </MuiThemeProvider>
    </Router>
  </div>,
  document.getElementById('root')
)