import React from 'react'
// import { Link } from 'react-router'
import { Segment, Button, Divider, Header, Image, Modal } from 'semantic-ui-react'
import { browserHistory, Link } from 'react-router'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import $ from 'jquery';
import 'whatwg-fetch';
import bodyParser from 'body-parser';

/*

**** Header.jsx에 있는 checkUser function 설명.

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
    this.myFunction = this.myFunction.bind(this);
  }

  myFunction(){
    fetch('/retrieveData',{
      method: 'GET'
    })
    .then(function(response){
      console.log(1);
      // if(!response.ok){
      //   console.log('fail');
      // } 
      // else {
        console.log(22222222222);
        console.log('response',response);
        console.log('response.data',response.data);
        console.log('response.body',response.body);
        // console.log('response.body',response.body);
        return response.json();
      })
    .then(function(json){
      console.log('abcdefg');
      console.log(json);
    })
  }

 
  responseGoogle (googleUser) {   //  google 로그인.

    console.log('google click');
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('id_token',id_token);
    var token = window.localStorage.getItem('xyzGoogle');
    
    var profile = googleUser.getBasicProfile();
    console.log('profile',profile);
    var email = googleUser.getBasicProfile().getEmail();
    console.log('email',email)
    var name = googleUser.getBasicProfile().getName();
    console.log('name', name);
    var date = new Date();

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

          // user의 정보를 fetch로 server에 보낸다.
          var obj = {};
          obj['new_token'] = new_token;
          obj['old_token'] = token;
          
          console.log('obj',obj);
          var data = JSON.stringify(obj);

          fetch('/googlenewtoken', {
            method : 'POST',
            body : data,
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }
          })
          .then(function(response){
            console.log(1);
            if(!response.ok){
              console.log('fail');
            }
            else {
              console.log('success');
              console.log(1, response);
            }
          })
          // 실제코드.
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

          var obj = {};
          obj['name'] = name;
          obj['email'] = email;
          obj['social'] = 'g';
          obj['token'] = id_token;
          obj['date'] = date;

          console.log('obj',obj);
          var data = JSON.stringify(obj);

          fetch('/googlenotoken', {
            method : 'POST',
            body : data,
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }
          })
          .then(function(response){
            console.log(1);
            if(!response.ok){
              console.log('fail');
            }
            else {
              console.log('success');
              console.log(1, response);
            }
          })
          //  실제코드.
          // browserHistory.push('/mydress');
        }
      })
    }
  }

  responseFacebook(response){     // facebook 로그인.
    
    console.log('facebook click');
    var name = response.name;
    var email = response.email;
    var accessToken = response.accessToken;
    var date = new Date();
    console.log('response',response);
    console.log('response.name',name);

    var fbToken = window.localStorage.getItem('xyzFacebook');  
    
    if(fbToken){  //  token이 있는 기존유저.
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

          var obj = {};
          obj['old_token'] = accessToken;
          obj['new_token'] = new_token;

          var data = JSON.stringify(obj);

          fetch('/fbnewtoken', {
            method : 'POST',
            body : data,
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }
          })
          .then(function(response){
            console.log(1);
            if(!response.ok){
              console.log('fail');
            }
            else {
              console.log('success');
              console.log(1, response);
            }
          })
          // 실제코드.
          // browserHistory.push('/mydress');
        }
      })
    }
    else {  //  첫 방문 (token이 없는) 유저.
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

          var obj = {};
          obj['name'] = name;
          obj['email'] = email;
          obj['social'] = 'f';
          obj['token'] = accessToken;
          obj['date'] = date;

          var data = JSON.stringify(obj);

          fetch('/fbnotoken', {
            method : 'POST',
            body : data,
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            }
          })
          .then(function(response){
            console.log(1);
            if(!response.ok){
              console.log('fail');
            }
            else { 
              console.log('success');
              console.log(1, response);
            }
          })
          // browserHistory.push('/mydress')
        }
      })
    }
  }

  taewoong(){
    console.log('!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!!@#$%^&%$#@!#$%^&%$#@@!');
    
    // var googleToken = window.localStorage.getItem('xyzGoogle');
    // var facebookToken = window.localStorage.getItem('xyzFacebook');
    
    // if(googleToken){     //  google 토큰 체크.
    //   console.log('i have google token')
      
    //   fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+googleToken)
    //   .then(function(response){
    //     console.log(1);
    //     if(!response.ok){     //  google 토큰이 만료되었을 때.
    //       console.log('expired google token');
    //       browserHistory.push('/login');
    //     } 
    //     else {        // 정상 토큰일 때.
    //       console.log('google token success');
    //       browserHistory.push('/mydress'); 
    //     }
    //   })
    // } 
    // else if(facebookToken){    // Facebook 토큰 체크.
    //   console.log('i have facebook token');
      
    //   fetch('https://graph.facebook.com/me?access_token='+facebookToken)
    //   .then(function(response){
    //     console.log(2);
    //     if(!response.ok){     //  facebook 토큰이 만료되었을 때.
    //       console.log('expired facebook token');
    //       browserHistory.push('/login');
    //     } 
    //     else {      //  정상 토큰일 때.
    //       console.log('facebook token success');
    //       browserHistory.push('/mydress');
    //     }
    //   })
    // } 
    // else {        //  토큰이 없는 첫방문자.
    //     console.log('no token');
    //     browserHistory.push('/login');
    // }
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
        <div>{window.localStorage.getItem('xyzGoogle')}</div>
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
        {/*<form action = "/taewoong123" 
          name = "person_info" method = "get"> 
        </form>*/}
        <div>
          <form action="/test_xyzDress" method="post" >
            <fieldset>
              <label for="dressname">Dress name:</label>
                <input type="text" id="dressname" name="dressName" placeholder="Enter your dress name" />
              <label for="filename">file name:</label>
                <input type="text" id="filename" name="fileName" placeholder="Enter your file name" />
              <label for="filesize">file size:</label>
                <input type="text" id="filesize" name="fileSize" placeholder="Enter your file name" />
              <label for="fileformat">file format:</label>
                <input type="text" id="fileformat" name="fileFormat" placeholder="Enter your file name" />
              <select name="selectpicker">
                <option name="outer" value="outer">outer</option>
                <option name="jacket" value="jacket">jacket</option>
                <option name="shirts" value="shirts">shirts</option>
                <option name="pants" value="pants">pants</option>
              </select>
              <input type="hidden" name='tokenGG' value={window.localStorage.getItem('xyzGoogle')} />
              <input type="hidden" name='tokenFB' value={window.localStorage.getItem('xyzFacebook')} />
              <input type="submit" value="Send message" />
              </fieldset>
           </form>
          </div>
          <div>
            <form action="/test_xyzCoordi" method="post" >
              <fieldset>
                <label for="dressname">Dress Coordi setname:</label>
                  <input type="text" id="dressname" name="dressCoordiSetName" value='taewoong' placeholder="Enter your dress coordi set name" />
                <label for="filename">Coordi 1:</label>
                  <input type="text" id="filename" name="coordi1" value='pants' placeholder="Enter your Coordi1" />
                <label for="filesize">Coordi 2:</label>
                  <input type="text" id="filesize" name="coordi2" value='shirts' placeholder="Enter your Coordi2" />
                <label for="fileformat">Coordi 3:</label>
                  <input type="text" id="fileformat" name="coordi3" value='shoes' placeholder="Enter your Coordi3" />
                
                <input type="hidden" name='tokenGG' value={window.localStorage.getItem('xyzGoogle')} />
                <input type="hidden" name='tokenFB' value={window.localStorage.getItem('xyzFacebook')} />
                <input type="submit" value="Send message" />
                </fieldset>
             </form>
          </div>
          <div>
            <button onClick={this.myFunction}>Click me</button>
          </div>
         <div>
          {this.props.data}
         </div>
      </div>
    );
  }
}

module.exports = LogIn
