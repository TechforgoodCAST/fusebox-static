import gapi from 'google-client-api';
import Vue from 'vue/dist/vue.esm.js';
import marked from 'marked';

import Heading from '../../components/heading.vue';
import PlanList from '../../components/plan-list.vue';
import Statement from '../../components/statement.vue';

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const DATA = {
  statement: {}
};

const vm = new Vue({
  el: '#app',
  data: { data: DATA },
  components: {
    Heading,
    PlanList,
    Statement
  }
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
    range: 'demo!A2:F',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {

      const firstRow = range.values[0]
      DATA.statement = {
        lastUpdated: firstRow[0],
        solution: marked(firstRow[1]),
        user: marked(firstRow[2]),
        social: marked(firstRow[3]),
        financial: marked(firstRow[4]),
        organisation: marked(firstRow[5])
      };

    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}
