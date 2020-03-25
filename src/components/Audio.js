import React from 'react'
import { Card, Image, Button, Icon } from 'semantic-ui-react'
import _get from 'lodash.get'

const Audio = props => {
  const { isPlaying, isLoaded, onLoad, onPlay, onPause } = props
  const title = _get(props, 'snippet.title', 'Title')
  const thumbnailUrl = _get(props, 'snippet.thumbnails.high.url', '')

  return (
    <Card>
      <Card.Content>
        <Card.Meta>
          {
            isPlaying ? (
              <Button icon onClick={onPause}>
                <Icon name='pause' />
              </Button>
            ) : (
              <Button icon onClick={isLoaded ? onPlay : onLoad}>
                <Icon name='play' />
              </Button>
            )
          }
        </Card.Meta>
        <Card.Header style={{
          display: 'block',
          textOverflow: 'ellipsis',
          wordWrap: 'break-word',
          overflow: 'hidden',
          maxHeight: '1.8em',
          lineHeight: '1.8em'
        }}>{title}</Card.Header>
      </Card.Content>
      <Image src={thumbnailUrl} wrapped ui={false} />
    </Card>
  )
}

export default Audio