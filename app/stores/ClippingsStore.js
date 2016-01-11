import alt from '../alt';
import ClippingsActions from '../actions/ClippingsActions';

class ClippingsStore {
  constructor() {
    this.bindActions(ClippingsActions);
    this.loading = false;
    this.loaded = false;
    this.allClips = [];
    this.clips = [];
    this.titles = {};
    this.filterText = '';
  }

  onRequestClippings() {
    this.loading = true;
  }

  onReceiveClippings(clippings) {
    this.allClips = clippings;
    this._filterClips();
    this.loading = false;
    this.loaded = true;
  }

  _filterClips() {
    let clips = [];
    let titles = {};
    const filterWords = this.filterText.toLowerCase().split(' ');

    // Clips
    clips = this.allClips.filter(clip => {
      const title = clip.title.toLowerCase();
      const text = clip.text.toLowerCase();

      for(let word of filterWords) {
        if(title.indexOf(word) === -1 && text.indexOf(word) === -1) {
          return false;
        }
      }
      return true;
    });

    // Titles
    for(let clip of clips) {
      if(typeof(titles[clip.title]) == 'undefined') {
        titles[clip.title] = 0;
      }
      titles[clip.title] += 1;
    }

    // Update instance vars
    this.clips = clips;
    this.titles = titles;
  }
}

export default alt.createStore(ClippingsStore);