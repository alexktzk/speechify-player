import React from 'react';
import config from './config'
import Player from './components/Player'
import { Container } from 'semantic-ui-react'

const gapi = window.gapi

class App extends React.Component {
  state = {
    isSignedIn: false
  }

  componentDidMount() {
    gapi && gapi.load('client:auth2', this.init)
  }

  init = () => {
    gapi.client.init(config.GOOGLE_API_CREDENTIALS).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
    })
  }

  updateSigninStatus = isSignedIn => {
    this.setState({ isSignedIn })
  }

  signIn = () => {
    gapi.auth2.getAuthInstance().signIn()
  }

  signOut = () => {
    gapi.auth2.getAuthInstance().signOut()
  }

  render() {
    const { isSignedIn } = this.state
    return (
      <Container className="App" textAlign="center">
        {isSignedIn ? (
          <div>
            <button onClick={this.signOut}>Log out</button>
            <Player />
          </div>
        ) : (
          <button onClick={this.signIn}>Login with your Youtube account</button>
        )}
      </Container>
    )
  }
}

export default App;
