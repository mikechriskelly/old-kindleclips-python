import React from 'react';
import ClippingsList from './ClippingsList';
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
        <ClippingsList 
          clippings={this.props.clippings}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

export default AppRoot;