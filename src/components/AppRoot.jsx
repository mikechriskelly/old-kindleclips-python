import React from 'react';
import ClippingsList from './ClippingsList';
import RandomClip from './RandomClip';
import SearchBar from './SearchBar';

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
          clippings={this.props.clippings}
          filterText={this.state.filterText}
        />
      );
    } else {
      return (
        <RandomClip
          clippings={this.props.clippings}
        />
      );
    }
  }

  render() {

    var divStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '768px'
    };

    return (
      <div style={divStyle}>
        <SearchBar 
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
        />
        {this.setMainContent()}
      </div>
    );
  }
}

export default AppRoot;