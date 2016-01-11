import alt from '../alt';
import ClippingsAPI from '../api/ClippingsAPI';

class ClippingsActions {
  requestClippings() {
    // Call the action
    this.dispatch();

    // Promise is returned, when resolved call the received action
    ClippingsAPI.requestClippings().then(clippings => {
      this.actions.receiveClippings(clippings);
      console.log('Received clippings from API');
    }).catch(function(error) {
      console.log('API call failed', error);
    });
    console.log('Requested clippings');
  }

  receiveClippings(clippings) {
    this.dispatch(clippings);
  }

  filterClips(filterText) {
    this.dispatch(filterText);
  }
}

export default alt.createActions(ClippingsActions);