import React from 'react'
import axios from 'axios'
import Audio from './Audio'
import { Grid } from 'semantic-ui-react'
import config from '../config'

const gapi = window.gapi

class Player extends React.Component {
  state = {
    playlist: [],
    id: null,
    isPlaying: false,
  }

  componentDidMount() {
    this.loadPlaylist()
  }

  loadPlaylist = () => {
    gapi.client.youtube.videos.list({
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 25,
    }).then(res => {
      this.setState({ playlist: res.result.items })
    })
  }

  loadAudio = id => {
    this.setState({ id }, () => (
      this.fetchAudioUrl().then(url => {
        if (url) {
          this.player.setAttribute('src', url)
          this.player.load()
        } else {
          this.next()
        }
      })
    ))
  }

  fetchAudioUrl = async () => {
    const res = await axios.get(`${config.API_URL}/audios/${this.state.id}`)
    return res.data.url
  }

  play = () => {
    this.player && this.player.play()
    this.setState({ isPlaying: true })
  }

  pause = () => {
    this.player && this.player.pause()
    this.setState({ isPlaying: false })
  }

  next = () => {
    const id = this.getNextId()
    id && this.loadAudio(id)
  }

  defferredNext = () => setTimeout(this.next, 2000)

  getNextId = () => {
    const { playlist } = this.state
    const lastIndex = playlist.length - 1
    const currentIndex = playlist.findIndex(audio => audio.id === this.state.id)
    return currentIndex <= lastIndex ? playlist[currentIndex + 1].id : null
  }

  render() {
    const { playlist, id, isPlaying } = this.state

    return (
      <div>
        <audio controls autoPlay ref={ref => {this.player = ref}} onCanPlay={this.play} onEnded={this.defferredNext}>
          <source src="" type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>

        <Grid columns={3} doubling>
          {playlist.map(audio => (
            <Grid.Column key={audio.id}>
              <Audio
                {...audio}
                isLoaded={audio.id === id}
                isPlaying={audio.id === id && isPlaying}
                onLoad={() => this.loadAudio(audio.id)}
                onPlay={this.play}
                onPause={this.pause}
              />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    )
  }
}

export default Player