import React from 'react';
import ClipList from './ClipList';
import RandomClip from './RandomClip';
import DebounceInput from 'react-debounce-input';
import ClippingsActions from '../actions/ClippingsActions';
import ClippingsStore from '../stores/ClippingsStore';

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
    this.setState(state);
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  setInputBar() {
    if(this.state.clippings.length > 0) {
      return (
        <DebounceInput
          className="u-full-width SearchField"
          debounceTimeout={300}
          minLength={2}
          onChange={filterText => this.setState({filterText})}
          placeholder="Search..."
        />
      );
    }
  }

  setMainContent() {
    if(this.state.clippings.length > 0) {
      if(this.state.filterText.length > 0) {
        return (
          <ClipList 
            clippings={this.state.clippings}
            filterText={this.state.filterText}
          />
        );
      } else {
        return (
          <RandomClip
            clippings={this.state.clippings}
          />
        );
      }
    } else {
      return (
        <div>
          <h4>To view your Kindle Clips...</h4>
          <p>Allow this app to connect to your Dropbox folder. Then add 'My Clippings.txt' to Dropbbox/Apps/Kindle Clippings Viewer. You may need to refresh the page.</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Main">
        {this.setInputBar()}
        {this.setMainContent()}
      </div>
    );
  }
}

export default Main;