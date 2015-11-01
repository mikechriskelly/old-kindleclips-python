import alt from '../alt';
import DropboxActions from '../actions/DropboxActions';

import clippings from 'json!./../data/clippings.json';

class ClippingsStore {
  constructor() {
    this.clippings = clippings;
    this.filterText = '';
    this.bindListeners({
      //handleFetchClippings: DropboxActions.fetchClippings() 
    });
  }

  handleFetchClippings() {
    this.clippings = [];
  }
}

export default alt.createStore(ClippingsStore);

