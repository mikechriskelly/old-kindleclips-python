import React from 'react';
import ClippingsList from './ClippingsList';
import RandomClip from './RandomClip';
import DebounceInput from 'react-debounce-input';

import clippings from 'json!./../data/clippings.json';

class AppRoot extends React.Component {

  constructor() {
    super();
    this.state = {filterText: ''};
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  setMainContent() {
    if(this.state.filterText.length > 0) {
      return (
        <ClippingsList 
          clippings={clippings}
          filterText={this.state.filterText}
        />
      );
    } else {
      return (
        <RandomClip
          clippings={clippings}
        />
      );
    }
  }

  render() {
    return (
      <div className="AppRoot">
        <DebounceInput
          className="u-full-width"
          debounceTimeout={300}
          minLength={2}
          onChange={filterText => this.setState({filterText})}
          placeholder="Search..."
        />
        {this.setMainContent()}
      </div>
    );
  }
}

export default AppRoot;