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

  // componentWillMount(){

  //   var googleToken = window.localStorage.getItem('xyzGoogle');
  //   var facebookToken = window.localStorage.getItem('xyzFacebook');
    
  //   if(googleToken){     //  google 토큰 체크.
  //     console.log('i have google token')
      
  //     fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+googleToken)
  //     .then(function(response){
  //       console.log(1);
  //       if(!response.ok){     //  google 토큰이 만료되었을 때.
  //         console.log('expired google token');
  //         // browserHistory.push('/login');
  //       } 
  //       else {        // 정상 토큰일 때.
  //         console.log('google token success');
  //         // browserHistory.push('/mydress'); 
  //       }
  //     })
  //   } 
  //   else if(facebookToken){    // Facebook 토큰 체크.
  //     console.log('i have facebook token');
      
  //     fetch('https://graph.facebook.com/me?access_token='+facebookToken)
  //     .then(function(response){
  //       console.log(2);
  //       if(!response.ok){     //  facebook 토큰이 만료되었을 때.
  //         console.log('expired facebook token');
  //         // browserHistory.push('/login');
  //       } 
  //       else {      //  정상 토큰일 때.
  //         console.log('facebook token success');
  //         // browserHistory.push('/mydress');
  //       }
  //     })
  //   } 
  //   else {        //  토큰이 없는 첫방문자.
  //       console.log('no token');
  //       // browserHistory.push('/login');
  //   }
  // }

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