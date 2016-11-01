import React from 'react'
import { browserHistory, Link } from 'react-router'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import $ from 'jquery';
import 'whatwg-fetch';
// import fetch from 'node-fetch';

/*

**** Header에 있는 checkUser function 설명.

  - local에 token이 있는가?
    
    -true
      -fetch콜로 token이 유효한가?
        -true
          browserHistory.push('/mydress');
        -false
          browserHistory.push('/login');
    
    -false
      -browserHistory.push('/mydress');

**** Login에 있는 function 설명.

  - 구글 or 페북 로그인 버튼 클릭.
    - local에 token이 있는가?

      -true
        -token 재갱신.
          -browserHistory.push('/mydress');
      -false
        -새로운 token 저장.
          -browserHistory.push('/mydress');

*/


class LogIn extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loginTextGoogle : "Login with Google",
      loginTextFacebook : 'Login with FaceBook',
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.taewoong = this.taewoong.bind(this);
  }
 
  responseGoogle (googleUser) {   //  google 로그인.

    console.log('google click');
    var id_token = googleUser.getAuthResponse().id_token;
    var token = window.localStorage.getItem('xyzGoogle');
    console.log('id_token',id_token);
    // var email = googleUser.getBasicProfile().getEmail();
    
    if(token){   //  토큰이 있는 기존 유저.
      console.log('i have token but...');
      window.localStorage.removeItem('xyzGoogle');
      window.localStorage.setItem('xyzGoogle', id_token);
      var new_token = window.localStorage.getItem('xyzGoogle');

      fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+new_token)
      .then(function(response){
        console.log(1);
        if(!response.ok){
          console.log('not valid ID');
        }
        else{
          console.log('success token change');
          // browserHistory.push('/mydress');
        }
      })
    }
    else {   //  첫방문 (토큰이 없는) 유저.
      console.log('i dont have any token');
      window.localStorage.setItem('xyzGoogle', id_token);

      fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token)
      .then(function(response){
        console.log(2);
        if(!response.ok){
          console.log('not valid token');
        }
        else{
          console.log('success token');
          // browserHistory.push('/mydress');
        }
      })
    }
  }

  responseFacebook(response){     // facebook 로그인.
    
    console.log('facebook click');
    var accessToken = response.accessToken;
    var fbToken = window.localStorage.getItem('xyzFacebook');  
    
    if(fbToken){
      console.log('i have token but...');
      window.localStorage.removeItem('xyzFacebook');
      window.localStorage.setItem('xyzFacebook', accessToken);
      var new_token = window.localStorage.getItem('xyzFacebook');

      fetch('https://graph.facebook.com/me?access_token='+new_token)
      .then(function(response){
        console.log(1);
        if(!response.ok){
          console.log('not valid ID');
        }
        else{
          console.log('success token change');
          // browserHistory.push('/mydress');
        }
      })
    }
    else {
      console.log('i dont have any token');
      window.localStorage.setItem('xyzFacebook', accessToken);

      fetch('https://graph.facebook.com/me?access_token='+accessToken)
      .then(function(response){
        console.log(2);
        if(!response.ok){
          console.log('not valid token');
        }
        else {
          console.log('success token');
          // browserHistory.push('/mydress')
        }
      })
    }
  }

  taewoong(){
    console.log('!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!');
  }

  render () {
   
    this.taewoong()
    
    return (
      <div>
        <GoogleLogin 
          clientId={"681391014277-plrkjn39cj0ilg7pfi88s4fnb12sjlap.apps.googleusercontent.com"}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          offline={false}
          >
        </GoogleLogin>

        <FacebookLogin
          appId="1393584200670947" 
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          scope="email,public_profile,user_friends"
          icon="fa-facebook"
          >
        </FacebookLogin>
      </div>
    );
  }
}

module.exports = LogIn