import React from 'react';

class ClippingsList extends React.Component {
  render() {

    var rows = [];
    this.props.clippings.forEach(function(clipping) {
      rows.push(<p key={clipping.title}>{clipping.title}</p>);
    });
    
    return (
      <p>{rows}</p>
    );
  }
}

export default ClippingsList;