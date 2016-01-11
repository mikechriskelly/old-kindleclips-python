import React from 'react';
import LoadingIndicator from 'react-loading-indicator';

class RandomClip extends React.Component {
  setMainContent() {
    if(this.props.clips.length > 0) {
      const clip = this.props.clips[Math.floor(Math.random() * this.props.clips.length)];
      return (
        <div className="RandomClip container">
          <p>{clip.text}</p>
          <div className="Clip--title">{clip.title}</div>
        </div>
      );
    } else {
      return(
        <LoadingIndicator 
          className="main-loader"
        />
      );
    }
  }
  render() {
    return (
      <div>
        {this.setMainContent()}
      </div>
    );
  }
}

export default RandomClip;