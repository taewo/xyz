import React from 'react'
//import { browserHistory ,Link } from 'react-router'
//import $ from 'jquery';
import { Link } from 'react-router'
import { Container, Header, Image } from 'semantic-ui-react'

const src = 'upload/white-image.png'

class Landing extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state= {
  //     tokenFB : window.localStorage.getItem('xyzFacebook'),
  //     tokenGG : window.localStorage.getItem('xyzGoogle')
  //   };
  //   this.checkUser = this.checkUser.bind(this);
  // }

  // checkUser(){
  //   console.log(this.state.tokenGG);
  //   if(this.state.tokenGG){     //  google token
  //     console.log('i have google token')
  //     var token = this.state.tokenGG;
  //     $.ajax({  //  사용자 토큰 인증.
  //       type:'GET',
  //       url:'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ token,
  //       success:((data)=> {
  //         console.log("googgle token check success"); // goodle token 체크.
  //         browserHistory.push('/mydress');
  //       }),
  //       error: (err) => {
  //         console.log('decoding err');  //  token 에러.
  //         browserHistory.push('/login');
  //       }
  //     });
  //   } 
  //   else if(this.state.tokenFB){
  //     console.log('i have facebook token')
  //     var token = this.state.tokenFB;
  //     $.ajax({
  //       type:'GET',
  //       url:' https://graph.facebook.com/me?access_token='+ token,
  //       success:((data)=>{
  //         console.log('facebook token check success');
  //         browserHistory.push('/mydress');
  //       error:(err) => {
  //         console.log('facebook token check fail');
  //         browserHistory.push('/login');
  //       }
  //       })
  //     })
  //   }
  // }

  render () {
    return (
      <Container>
        <Header as='h2' textAlign='center'>
          xyz
        </Header>
        <Image src={src} size='medium' bordered centered/>

        <h2><Link to='/'>Landing 이동</Link></h2>
        <h2><Link to='/login'>LogIn</Link></h2>
        <h2><Link to='/mydress'>MYDress</Link></h2>
      </Container>
    )
  }
  
}

module.exports = Landing
