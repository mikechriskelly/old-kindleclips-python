import 'whatwg-fetch';

class ClippingsAPI {
  static requestClippings() {
    return fetch('/getclips', {
      credentials: 'same-origin'
    })
    .then(response => {
      return response.json();
     }).then(json => {
      return JSON.parse(json);
     }).catch(error => {
      console.log('Parsing failed', error);
     });
  }
}

export default ClippingsAPI;
