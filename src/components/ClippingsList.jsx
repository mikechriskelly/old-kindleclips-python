import React from 'react';
import Clip from './Clip';

class ClippingsList extends React.Component {
  render() {

    var rows = [];
    this.props.clippings.forEach(function(clip) {
      if(clip.text.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<Clip clip={clip}/>);
    }.bind(this));

    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default ClippingsList;