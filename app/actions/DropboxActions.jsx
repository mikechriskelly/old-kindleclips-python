import alt from '../alt';

class DropboxActions {

  fetchClippings() {
    var client = new Dropbox.Client({ key: 'ynrpnmbtz8t3bpy' });

    client.authenticate(function (error, client) {
      if(error) {
        console.error(error);
      }

      client.onError.addListener(function (error) {
        if(window.console) {
          console.error(error);
        }
      });
      console.log(client);
      
      client.getAccountInfo(function(error, accountInfo) { console.log(accountInfo); });
    });
  }
}

export default alt.createActions(DropboxActions);