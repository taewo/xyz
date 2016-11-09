import React from 'react'
//import { browserHistory ,Link } from 'react-router'
//import $ from 'jquery';
import { Link } from 'react-router'
import { Container, Header, Image } from 'semantic-ui-react'

const src = 'upload/white-image.png'

class Landing extends React.Component {

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
