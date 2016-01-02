import React from 'react';
import ClipList from './ClipList';
import RandomClip from './RandomClip';
import DebounceInput from 'react-debounce-input';
import ClippingsActions from '../actions/ClippingsActions';
import ClippingsStore from '../stores/ClippingsStore';
import LoadingIndicator from 'react-loading-indicator';

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

  setHeader() {
    if(this.state.clippings.length > 0) {
      return (
        <div className="Header">
          <div className="container">
            <div className="three columns">
              <a className="Header--top-links" href="#random">Random</a>
              <a className="Header--top-links" href="#browse">Browse</a>
            </div>
            <div className="nine columns">
              <div className="InputBar">
                <img className="InputBar--search-icon" src="assets/search-icon.svg"/>
                <DebounceInput
                  className="u-full-width SearchField"
                  debounceTimeout={300}
                  minLength={2}
                  onChange={filterText => this.setState({filterText})}
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>
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
      return(
        <LoadingIndicator 
          className="main-loader"
        />
      );
    }
  }

  render() {
    return (
      <div>
        {this.setHeader()}
        {this.setMainContent()}
      </div>
    );
  }
}

export default Main;