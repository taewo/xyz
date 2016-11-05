import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Layout from './components/Layout'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import MyDress from './components/MyDress'
import PhotoEdit from './components/PhotoEdit'


class App extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
          <Route path='/login' component={LogIn} />
          <Route path='/mydress' component={MyDress} />
          <Route path='/photoedit' component={PhotoEdit} />
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))