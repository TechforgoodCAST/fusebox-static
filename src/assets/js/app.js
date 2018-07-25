import gapi from 'google-client-api';
import Vue from 'vue/dist/vue.esm.js';
import marked from 'marked';

import queryParams from './modules/params.js';

import Consent from '../../components/consent.vue';
import Evidence from '../../components/evidence/new.vue';
import Plan from '../../components/plan.vue';
import PlanList from '../../components/plan-list.vue';
import SiteFooter from '../../components/site-footer.vue';
import SiteHeader from '../../components/site-header.vue';
import Statement from '../../components/statement.vue';

const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const DATA = {
  loaded: 0,
  config: {},
  dashboard: {},
  plans: [],
  evidence: [],
  params: queryParams.all(window.location.search, ['t', 'name', 'testId'])
};

const vm = new Vue({
  el: '#app',
  data: { data: DATA },
  components: {
    Consent,
    Evidence,
    Plan,
    PlanList,
    SiteFooter,
    SiteHeader,
    Statement
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
    getConfig(gapi);
    getDashboard(gapi);
    getEvidence(gapi);
    getPlans(gapi);
  });
}

function getConfig(gapi) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: DATA.params.t,
    range: 'config!A2:E2',
  }).then(function(response) {
    var range = response.result;
    if (range.values) {
      range.values.forEach(function (i) {
        return DATA.config = {
          formUrl: i[0],
          formInputName: i[1],
          formInputDetails: i[2],
          formInputSource: i[3],
          formInputTestId: i[4]
        };
      })
    }
  }, function(response) {
    DATA.loaded = -1;
  });
}

function getDashboard(gapi) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: DATA.params.t,
    range: 'dashboard!A2:I',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {

      // TODO: refactor
      const firstRow = range.values[0]
      DATA.dashboard = {
        team: firstRow[0],
        project: firstRow[1],
        description: firstRow[2],
        website: firstRow[3],
        solution: marked(firstRow[4] || '-'),
        user: marked(firstRow[5] || '-'),
        social: marked(firstRow[6] || '-'),
        financial: marked(firstRow[7] || '-'),
        organisation: marked(firstRow[8] || '-'),
        updated: firstRow[8]
      };

    } else {
      DATA.loaded = -1;
    }
  }, function(response) {
    DATA.loaded = -1;
  });
}

function getEvidence(gapi) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: DATA.params.t,
    range: 'evidence!A2:F',
  }).then(function(response) {
    var range = response.result;
    if (range.values) {
      range.values.forEach(function (i) {
        return DATA.evidence.push({
          lastUpdated: i[0],
          name: i[1],
          details: i[2],
          source: i[3],
          testId: i[4],
          editEvidenceUrl: i[5]
        });
      })
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
        status: planDetails[1],
        due: planDetails[2],
        description: planDetails[3],
        updated: planDetails[4],
        tests: []
      };

      range.values.slice(3).forEach(function (row) {
        plan.tests.push({
          assumption: row[0],
          status: row[1],
          category: row[2],
          details: marked(row[3] || '-'),
          success: marked(row[4] || '-'),
          support: marked(row[5] || '-'),
          assignees: row[6],
          testId: row[7]
        });
      });

      DATA.plans.push(plan);
    }
  });
}
