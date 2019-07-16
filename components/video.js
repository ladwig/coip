import { Component } from 'react'
import { Image } from 'react-bootstrap'
import Head from 'next/head'

class Video extends Component {
  constructor(props) {
    super(props);
  }

render() {
    return (
      <div>
      <Image className="videopicture" src="/static/fakecam.jpg" fluid />
     </div>
    )
  }
}

export default Video
