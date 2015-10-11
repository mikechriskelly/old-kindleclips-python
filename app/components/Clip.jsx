import React from 'react';

class Clip extends React.Component {
  render() {

    var divStyle = {
      borderBottom: '1px solid #eee',
      padding: '10px 0'
    };

    var titleStyle = {
      color: '#a71d5d',
      fontSize: '10px',
      textAlign: 'left'
    };

    return (
      <div style={divStyle}>
        <p>{this.props.clip.text}</p>
        <div style={titleStyle}>{this.props.clip.title}</div>
      </div>
    );
  }
}

export default Clip;