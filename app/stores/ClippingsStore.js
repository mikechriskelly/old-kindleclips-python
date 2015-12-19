import alt from '../alt';
import ClippingsActions from '../actions/ClippingsActions';

class ClippingsStore {
  constructor() {
    this.bindActions(ClippingsActions);

    this.loadingClippings = false;
    this.clippings = [];
    this.filterText = '';
  }

  onRequestClippings() {
    this.loadingClippings = true;
  }

  onReceiveClippings(rawClippings) {
    this._init(rawClippings);
    this.loadingClippings = false;
  }

  _init(rawClippings) {
    this.clippings = rawClippings;
  }
}

export default alt.createStore(ClippingsStore);