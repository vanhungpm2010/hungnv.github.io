import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import UserList from './components/UserList'

if (document.getElementById('root'))
    ReactDOM.render(<App />, document.getElementById('root'))
if (document.getElementById('userlist'))
    ReactDOM.render(<UserList />, document.getElementById('userlist'))