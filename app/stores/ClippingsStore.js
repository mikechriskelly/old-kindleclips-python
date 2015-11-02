import alt from '../alt';
import DropboxActions from '../actions/DropboxActions';

class ClippingsStore {
  constructor() {
    this.clippings = [];
    this.filterText = '';
    this.bindListeners({
      updateClippings: DropboxActions.UPDATE_CLIPPINGS 
    });
  }

  updateClippings(clippings) {
    this.clippings = clippings;
    console.log(clippings);
    this.emitChange();
  }
}

export default alt.createStore(ClippingsStore);