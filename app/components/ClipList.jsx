import React from 'react';
import Clip from './Clip';

class ClipList extends React.Component {

  truncateOnWord(str, limit) {
    const trimmable = `
      \u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E
      \u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008
      \u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF`;

    const reg = new RegExp('(?=[' + trimmable + '])');
    const words = str.split(reg);
    
    let count = 0;
    if(str.length >= limit) {
      return words.filter(function(word) {
        count += word.length;
        return count <= limit;
      }).join('').concat('...');
    } else {
      return str;
    }
  }

  render() {

    let rows = [];
    let titles = {};
    const filterWords = this.props.filterText.toLowerCase().split(' ');

    this.props.clippings.forEach(function(clip) {
      let text = clip.text.toLowerCase();
      let title = clip.title.toLowerCase();

      for(let i = 0; i < filterWords.length; i++) {
        if(text.indexOf(filterWords[i]) === -1 && title.indexOf(filterWords[i]) === -1) {
          return;
        }
      }
      
      rows.push(<Clip key={clip.id} clip={clip}/>);

      if(titles.hasOwnProperty(clip.title)) {
        titles[clip.title] += 1;
      } else {
        titles[clip.title] = 1;
      }
    });

    return (
      <div className="ClipList container">
        <div className="three columns">
          <p>Titles</p>
          <ul>
            <li className="Clip--title Clip--title-active">All Results <span className="Clip--count">({rows.length})</span></li>
            {Object.keys(titles).map(key => {
              return <li className="Clip--title">{this.truncateOnWord(key, 35)} <span className="Clip--count">({titles[key]})</span></li>;
            })}
          </ul>
        </div>
        <div className="nine columns">
          {rows}
        </div>
      </div>
    );
  }
}
export default ClipList;