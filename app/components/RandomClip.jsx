import React from 'react';
import Clip from './Clip';

class RandomClip extends React.Component {
  render() {

    var clip = this.props.clippings[Math.floor(Math.random() * this.props.clippings.length)];

    return (
      <div className="RandomClip">
        <p>{clip.text}</p>
        <div className="Clip--title">{clip.title}</div>
      </div>
    );
  }
}

export default RandomClip;