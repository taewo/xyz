import React from 'react'
import { Link } from 'react-router'
import { Segment, Button, Divider, Header, Image, Modal } from 'semantic-ui-react'

class LogIn extends React.Component {

  render () {
    return (
      <div>
        <h1>LogIn Page</h1>

        <Button circular color='facebook' icon='facebook' />
        <Button circular color='linkedin' icon='linkedin' />
        <Button circular color='google plus' icon='google plus' />

        <Segment padded>
          <Button primary fluid>Login</Button>
          <Divider horizontal>Or</Divider>
          <Button secondary fluid>Sign Up Now</Button>
        </Segment>

        <Modal trigger={<Button>Show Modal</Button>}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='http://semantic-ui.com/images/avatar2/large/rachel.png' />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>

        <h2><Link to='/'>Landing 이동</Link></h2>
        <h2><Link to='/login'>LogIn</Link></h2>
        <h2><Link to='/mydress'>MYDress</Link></h2>
      </div>
    )
  }
  
}

module.exports = LogIn