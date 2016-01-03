import React from 'react';
import ReactDOM from 'react-dom';
import DebounceInput from 'react-debounce-input';

class SearchBar extends React.Component {

  handleUserInput(filterText) {
    this.props.onChange({'filterText': filterText});
    
    if(filterText.length == 0) {
      this.context.history.pushState(null, '/clips/random');
    } else {
      this.context.history.pushState(null, '/clips/browse');
    }
  }

  render() {
    return (
      <div className="InputBar">
        <img className="InputBar--search-icon" src="/assets/search-icon.svg"/>
        <DebounceInput
          className="u-full-width SearchField"
          debounceTimeout={300}
          minLength={2}
          onChange={filterText => this.handleUserInput(filterText)}
          placeholder="Search..."
        />
      </div>
    );
  }
}

// Add static property to class so route can be dynamically changed
SearchBar.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}

export default SearchBar;