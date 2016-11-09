import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

class MyDress extends React.Component {

  render () {
    return (
      <div>
        <h1>MyDress Page</h1>
        <h2><Link to='/'>Landing 이동</Link></h2>
        <h2><Link to='/login'>LogIn</Link></h2>
        <h2><Link to='/mydress'>MYDress</Link></h2>
        <h1>{window.localStorage.getItem('xyzGoogle')}</h1>
        <h1>{window.localStorage.getItem('xyzFacebook')}</h1>
        <div>
          {/*<form action = "http://localhost:8080/form.jsp" accept-charset="utf-8" 
              name = "person_info" method = "get"> 
        </form>*/}
        </div>
      </div>
    )
  }
  
}

module.exports = MyDress
