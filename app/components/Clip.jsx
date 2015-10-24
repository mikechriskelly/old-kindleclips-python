import React from 'react';

class Clip extends React.Component {
  render() {
    return (
      <div className="Clip">
        <p>{this.props.clip.text}</p>
        <div className="Clip--title">{this.props.clip.title}</div>
      </div>
    );
  }
}

export default Clip;