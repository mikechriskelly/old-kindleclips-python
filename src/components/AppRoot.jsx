import React from 'react';
import ClippingsList from './ClippingsList';

class AppRoot extends React.Component {
  render() {

    var divStyle = {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '768px'
    };

    return (
      <div style={divStyle}>
        <h1>Bookshelf</h1>
        <ClippingsList clippings={this.props.clippings}/>
      </div>
    );
  }
}

export default AppRoot;