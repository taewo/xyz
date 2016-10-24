import React from 'react'
import { Link } from 'react-router'
import GoogleLogin from 'react-google-login';
import $ from 'jquery';
import FacebookLogin from 'react-facebook-login';



class LogIn extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loginText : "Login with Google"
    };
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log(1,googleUser);
    console.log(2,{accessToken: id_token});
    console.log(3, profile);
    console.log(4,profile.getName());
    console.log(5, id_token);

    //anything else you want to do(save to localStorage)... 
 
    // $.ajax({
    //   type:'GET',
    //   url:'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+id_token,
    //   datatype:'jsonp',
    //   success:((data)=> {
    //     console.log("googgle token check success");
    //     this.setState({loginText:data.name});
    //   }).bind(this),
    //   error: (err) => {
    //     console.log('decoding err');
    //   }
    // });
  }

  responseFacebook(response){
    console.log(1,'taew',response);
  }

  render () {
    return (
      <div>
        <GoogleLogin 
          clientId={"681391014277-plrkjn39cj0ilg7pfi88s4fnb12sjlap.apps.googleusercontent.com"}
          //class="google-login"
          // 접근 요청할 수 있는 데이터
          //scope="profile"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          offline={false}
          //responseHandler={this.responseGoogle}
          >
          <span>{this.state.loginText}</span>
        </GoogleLogin>

        <FacebookLogin
          appId="1393584200670947"
          autoLoad={true}
          fields="name,email,picture"
          // onClick={componentClicked}
          scope="email,public_profile,user_friends"      
          callback={this.responseFacebook}
          >
          <span>click FB</span>
        </FacebookLogin>
      </div>

    );
  }
}

module.exports = LogIn