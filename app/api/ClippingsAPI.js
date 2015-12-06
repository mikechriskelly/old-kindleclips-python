import 'whatwg-fetch';

class ClippingsAPI {
  static requestClippings() {
    console.dir(fetch);
    return fetch('/api')
      .then(function(response) {
        console.log(response);
        return response.text();
      })
  }
}

export default ClippingsAPI;
