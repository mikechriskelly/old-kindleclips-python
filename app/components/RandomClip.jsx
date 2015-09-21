import React from 'react';
import Clip from './Clip';

class RandomClip extends React.Component {
  render() {

    var clip = this.props.clippings[Math.floor(Math.random() * this.props.clippings.length)];

    return (
      <div>
        <Clip clip={clip}/>
      </div>
    );
  }
}

export default RandomClip;