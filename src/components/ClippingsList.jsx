import React from 'react';
import Clip from './Clip';

class ClippingsList extends React.Component {
  render() {

    var rows = [];
    var filter = this.props.filterText.toUpperCase();

    this.props.clippings.forEach(function(clip) {
      if(clip.text.toUpperCase().indexOf(filter) === -1 && clip.title.toUpperCase().indexOf(filter) === -1) {
        return;
      }
      rows.push(<Clip clip={clip}/>);
    });

    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default ClippingsList;