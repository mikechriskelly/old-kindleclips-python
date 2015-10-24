import React from 'react';
import Clip from './Clip';

class ClippingsList extends React.Component {
  render() {

    let rows = [];
    const filterWords = this.props.filterText.toLowerCase().split(' ');

    this.props.clippings.forEach(function(clip) {
      let text = clip.text.toLowerCase();
      let title = clip.title.toLowerCase();

      for(let i = 0; i < filterWords.length; i++) {
        if(text.indexOf(filterWords[i]) === -1 && title.indexOf(filterWords[i]) === -1) {
          return;
        }
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