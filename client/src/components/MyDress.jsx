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
	{/*
        <h2><Link to='/photoedit'>photoedit</Link></h2>
        <form action="server.cgi" method="post" encType="multipart/form-data">
          <input type="file" name="image" accept="image/*" id="take-picture" capture="camera"/>
          <canvas></canvas>
        </form>
	*/}
      </div>
    )
  }
  
}

module.exports = MyDress
