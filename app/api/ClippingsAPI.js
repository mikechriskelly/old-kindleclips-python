import 'whatwg-fetch';

class ClippingsAPI {
  static requestClippings() {
    return fetch('/api', {
    	credentials: 'same-origin'
    })
      .then(function(response) {
        return response.text()
  	   }).then(function(body) {
    	console.log(body)
       });
  }
}

export default ClippingsAPI;
