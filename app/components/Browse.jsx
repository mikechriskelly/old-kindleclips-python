import React from 'react';
import ClipList from './ClipList';
import LoadingIndicator from 'react-loading-indicator';

class Main extends React.Component {

  setMainContent() {
    if(this.props.clips.length > 0) {
      return (
        <ClipList 
          clips={this.props.clips}
          filterText={this.props.filterText}
        />
      );
    } else {
      return(<LoadingIndicator className="main-loader"/>);
    }
  }

  render() {
    return (
      <div>
        {this.setMainContent()}
      </div>
    );
  }
}

export default Main;