import alt from '../alt';
import clippings from 'json!./../data/clippings.json';

class DropboxActions {

  constructor() {
    this.client = null;
  }

  connect() {
    var Client = new Dropbox.Client({ key: 'ynrpnmbtz8t3bpy' });

    Client.authenticate(function (error, response) {
      if(error) {
        console.error(error);
      }

      Client.onError.addListener(function (error) {
        if(window.console) {
          console.error(error);
        }
      });

      console.log(response);
      response.getAccountInfo(function(error, accountInfo) { console.log(accountInfo); });

      this.actions.updateClippings(response);
    }.bind(this));
  }

  updateClippings(clippings) {
    this.dispatch(clippings);
  }
}

export default alt.createActions(DropboxActions);