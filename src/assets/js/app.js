import gapi from 'google-client-api';
import Vue from 'vue/dist/vue.esm.js';
import marked from 'marked';

import queryParams from './modules/params.js';

import Plan from '../../components/plan.vue';
import PlanList from '../../components/plan-list.vue';
import SiteHeader from '../../components/site-header.vue';
import Statement from '../../components/statement.vue';

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const DATA = {
  loaded: 0,
  dashboard: {},
  plans: [],
  params: queryParams.all(window.location.search, ['t', 'name'])
};

const vm = new Vue({
  el: '#app',
  data: { data: DATA },
  components: {
    Plan,
    PlanList,
    SiteHeader,
    Statement
  },
  methods: {
    getPlan: function (sheetName) {
      return this.data.plans.filter((i) => i.sheet === sheetName)[0];
    }
  }
});

gapi().then(function(gapi) {
  if (!DATA.params.t) {
    return DATA.loaded = -1;
  }
  gapi.load('client', initClient(gapi));
});

function initClient(gapi) {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS
  }).then(function () {
    getDashboard(gapi);
    getPlans(gapi);
  });
}

function getDashboard(gapi) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: DATA.params.t,
    range: 'dashboard!A2:H',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {

      const firstRow = range.values[0]
      DATA.dashboard = {
        team: firstRow[0],
        project: firstRow[1],
        description: firstRow[2],
        solution: marked(firstRow[3]),
        user: marked(firstRow[4]),
        social: marked(firstRow[5]),
        financial: marked(firstRow[6]),
        organisation: marked(firstRow[7])
      };

    } else {
      DATA.loaded = -1;
    }
  }, function(response) {
    DATA.loaded = -1;
  });
}

function getPlans(gapi) {
  gapi.client.sheets.spreadsheets.get({
    spreadsheetId: DATA.params.t
  }).then(function(response) {
    const sheets = response.result.sheets;
    sheets.forEach(function (sheet) {
      const title = sheet.properties.title;

      if (title.match(/^testing-plan/)) {
        getPlan(gapi, title);
      }

      DATA.loaded = 1;
    });
  });
}

function getPlan(gapi, sheet) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: DATA.params.t,
    range: `${sheet}!A:H`,
  }).then(function(response) {
    const range = response.result;
    if (range.values) {
      const planDetails = range.values[1];

      const plan = {
        sheet: sheet,
        name: planDetails[0],
        description: planDetails[1],
        dueDate: planDetails[2],
        lastUpdated: planDetails[3],
        status: planDetails[4],
        tests: []
      };

      range.values.slice(4).forEach(function (row) {
        plan.tests.push({
          assumption: row[0],
          status: row[1],
          category: row[2],
          details: marked(row[5]),
          success: marked(row[6]),
          support: marked(row[7])
        });
      });

      DATA.plans.push(plan);
    }
  });
}
