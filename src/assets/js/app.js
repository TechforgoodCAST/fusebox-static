import gapi from 'google-client-api';
import Vue from 'vue/dist/vue.esm.js';

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const DATA = [];

const vm = new Vue({
  el: '#app',
  data: { experiments: DATA }
});

gapi().then(function(gapi) {
  gapi.load('client', initClient(gapi));
});

function initClient(gapi) {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS
  }).then(function () {
    listAssumptions(gapi);
  });
}

function listAssumptions(gapi) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1W7o2Ce5cgLQJyWFU1Tu_I5FMxtEfPtnduAOek7KxDPU',
    range: 'demo!A2:D',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        DATA.push({
          'id': row[0],
          'published': row[1],
          'status': row[2],
          'name': row[3]
        })
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}
