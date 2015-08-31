import React from 'react';

class SearchBar extends React.Component {

  handleChange() {
    this.props.onUserInput(React.findDOMNode(this).value);
  }

  render() {
    return (
      <input
        className="u-full-width"
        onChange={this.handleChange.bind(this)}
        placeholder="Search..."
        type="search"
        value={this.props.filterText}
      />
    );
  }
}

export default SearchBar;