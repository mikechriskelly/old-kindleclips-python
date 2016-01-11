import React from 'react';
import ClippingsActions from '../actions/ClippingsActions';
import ClippingsStore from '../stores/ClippingsStore';
import SearchBar from './SearchBar';

class Main extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ClippingsStore.getState();
  }

  componentDidMount() {
    ClippingsStore.listen(this.onChange);
    ClippingsActions.requestClippings();
  }

  componentWillUnmount() {
    ClippingsStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log(state);
    this.setState(state);
  }

  onFilterChange(filterText) {
    ClippingsActions.filterClips(filterText);
    this.replaceState({
      filterText: filterText
    });
  }

  render() {
    var childrenWithProps = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { 
        clips: this.state.clips,
        titles: this.state.titles,
        filterText: this.state.filterText 
      });
    });

    return (
      <div>
        <div className="Header">
          <div className="container">
            <div className="three columns">
              <a className="Header--top-links" href="/clips/random">Random</a>
              <a className="Header--top-links" href="/clips/browse">Browse</a>
            </div>
            <div className="nine columns">
              <SearchBar 
                filterText={this.state.filterText}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </div>
        </div>
        {childrenWithProps}
      </div>
    );
  }
}

export default Main;