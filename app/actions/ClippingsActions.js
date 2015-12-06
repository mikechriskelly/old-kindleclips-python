import alt from '../alt';
import ClippingsAPI from '../api/ClippingsAPI';

class ClippingsActions {

  receiveClippings(clippings) {
    this.dispatch(clippings);
  }

  requestClippings() {
    // Reference 'this' to call actions inside the promise
    var actionDispatcher = this;

    // Call the action
    actionDispatcher.dispatch();

    // Promise is returned, when resolved call the received action
    ClippingsAPI.requestClippings().then(function(clippings) {
      actionDispatcher.actions.receiveClippings(clippings);
      console.log('Received clippings from API');
    }).catch(function(error) {
      console.log(error);
    })
    console.log('Requested clippings');
  }
}

export default alt.createActions(ClippingsActions);