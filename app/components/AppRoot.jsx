import React from 'react';

class AppRoot extends React.Component {

  render() {
    return (
      <div className="AppRoot">
        {this.props.children}
      </div>
    );
  }
}

export default AppRoot;