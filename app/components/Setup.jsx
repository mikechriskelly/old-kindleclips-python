import React from 'react';

class Setup extends React.Component {

  setContent() {
    if(this.props.route.step == '1') {
      return (
        <ol>
          <li><a href="/login">Connect to your Dropbox account.</a></li>
          <li className="todo--next">Copy My Clippings.txt from your Kindle to the Dropbox folder for this app.</li>
        </ol>
      );
    } else if(this.props.route.step == '2') {
      return (
        <ol>
          <li className="todo--done">Connect to your Dropbox account. &#10004;</li>
          <li>Copy <code>My Clippings.txt</code> from your Kindle to the Dropbox folder for this app:
          <code>Dropbbox/Apps/Kindle Clippings Viewer</code></li>
        </ol>
      );
    }
  }

  render() {
    return (
      <div className="Main">
        <div>
          <h4>Setup Kindle Clippings Viewer</h4>
          {this.setContent()}
          {this.props.route.step == '2' ? <a className="button button-primary" href="/setup">Continue...</a> : null }
        </div>
      </div>
    );
  }
}

export default Setup;