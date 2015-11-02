import alt from '../alt';
import DropboxActions from '../actions/DropboxActions';

class ClippingsStore {
  constructor() {
    this.clippings = [];
    this.filterText = '';
    this.bindListeners({
      updateClippings: DropboxActions.FETCH_CLIPPINGS 
    });
  }

  updateClippings(clippings) {
    this.clippings = clippings;
    //this.emitChange();
  }

  getClippings() {
    return this.clippings;
  }
}

export default alt.createStore(ClippingsStore);