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

      //response.getAccountInfo(function(error, accountInfo) { console.log(accountInfo); });

      this.client = response;
      this.actions.fetchClippings(response);
    }.bind(this));
  }

  fetchClippings(client) {
    client.readFile('My Clippings.txt', function (error, file) {
      if(error) {
        console.error(error);
      }

      const SECTION_SEPARATOR = '==========';

      const clippings = file.split(SECTION_SEPARATOR).map(section => {

        let lines = section.trim().split(/\r?\n/);
        let metas = lines[1] || '';
        let defaultValue = ['','',''];

        return {
          title: (lines[0].match(/(.+?)\((.*?)\)$/) || defaultValue)[1].trim(),
          author: (lines[0].match(/(.+?)\((.*?)\)$/) || defaultValue)[2].trim(),
          time: (metas.match(/ on (.+)/) || defaultValue)[1],
          //location: (metas.match(/(?:Loc\.|Page)(.+)\|/) || defaultValue)[1].trim(),
          text: lines.slice(2).join('\n').trim()
        };
      });

      //console.log(clippings);
      this.dispatch(clippings);  

    }.bind(this));
  }
}

export default alt.createActions(DropboxActions);