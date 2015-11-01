import React from 'react';
import ClippingsList from './ClippingsList';
import RandomClip from './RandomClip';
import DebounceInput from 'react-debounce-input';
import DropboxActions from '../actions/DropboxActions';
import ClippingsStore from '../stores/ClippingsStore';

class Main extends React.Component {

  constructor() {
    super();
    this.state = ClippingsStore.getState();
  }

  componentDidMount() {
    ClippingsStore.listen(this.onChange);
    ClippingsStore.fetchClippings();
  }

  componentWillUnmount() {
    ClippingsStore.unlisten(this.onChange);
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
  }

  render() {
    return (
      <div className="Main">
        <DebounceInput
          className="u-full-width SearchField"
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

export default Main;