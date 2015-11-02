import React from 'react';
import ClippingsList from './ClippingsList';
import RandomClip from './RandomClip';
import DebounceInput from 'react-debounce-input';
import DropboxActions from '../actions/DropboxActions';
import ClippingsStore from '../stores/ClippingsStore';

class Main extends React.Component {

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = ClippingsStore.getState();
  }

  componentDidMount() {
    DropboxActions.connect();
    ClippingsStore.listen(this.onChange);
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
          <ClippingsList 
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
          <p>Allow this app to connect to your Dropbox folder. Then add 'My Clippings.txt' to Dropbbox/Apps/Kindle Clippings Viewer</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Main">
        
        {this.setMainContent()}
      </div>
    );
  }
}

export default Main;