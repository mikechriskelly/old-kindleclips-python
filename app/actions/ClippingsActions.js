import alt from '../alt';
import ClippingsAPI from '../api/ClippingsAPI';

class ClippingsActions {

  receiveClippings(clippings) {
    this.dispatch(clippings);
  }

  requestClippings() {
    // Call the action
    this.dispatch();

    // Promise is returned, when resolved call the received action
    ClippingsAPI.requestClippings().then(clippings => {
      this.actions.receiveClippings(clippings);
      console.log('Received clippings from API');
    }).catch(function(error) {
      console.log('API call failed', error);
    })
    console.log('Requested clippings');
  }
}

export default alt.createActions(ClippingsActions);