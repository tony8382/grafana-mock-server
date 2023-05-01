import { FastifyPluginAsync, FastifyRequest } from "fastify";

import * as countryTimeseries from '../../mockData/country-series.json';
import * as timeserie from '../../mockData/series.json';

var now = Date.now();

for (var i = timeserie.length - 1; i >= 0; i--) {
  var series = timeserie[i];
  var decreaser = 0;
  for (var y = series.datapoints.length - 1; y >= 0; y--) {
    series.datapoints[y][1] = Math.round((now - decreaser) / 1000) * 1000;
    decreaser += 600000;
  }
}

var table =
{
  columns: [
    { text: 'Time', type: 'time' },
    { text: 'User', type: 'string' },
    { text: 'ORG', type: 'string' },
    { text: 'Function', type: 'string' },
    { text: 'Status', type: 'number' }
  ],
  rows: [
    [1682942332, 'SE', 'A', '/api/test', 200],
    [1682942332, 'DE', 'A', '/api/test3', 200],
    [1682942332, 'DE', 'B', '/api/test2', 200],
    [1682942332, 'US', 'A', '/api/test', 203],
  ]
};

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { status: "true" }
  })
  fastify.post('/search', async function (request, reply) {

    return ["week_distribution", "upper_25", "upper_50", "upper_75", "upper_90", "upper_95", "status_200", "status_500"]
    // return [{ "text": "upper_25", "value": 1 }, { "text": "upper_75", "value": 2 }]

  })

  type QueryRequest = FastifyRequest<{
    Body: {
      adhocFilters: {
        key: string
        operator: string
        value: string
      }[],
      targets: GrafanaTarget[]
    }
  }>

  type GrafanaTarget = {
    target: string
    refId: string
    type: string
  }

  fastify.post('/query', async function (request: QueryRequest, reply) {

    var tsResult: any[] = [];
    let fakeData: any[] = timeserie;

    //TODO:: how to set ad-hoc filter
    if (request.body.adhocFilters && request.body.adhocFilters.length > 0) {
      fakeData = countryTimeseries;
    }

    for (const target of request.body.targets) {
      console.log(JSON.stringify(target))
      if (target.type === 'table') {
        tsResult.push(table);
      } else {
        tsResult.push(fakeData.filter(t => {
          return t.target === target.target
        })[0])
      }
    }


    return tsResult
  })
  fastify.post('/annotations', async function (request, reply) {

    return {
      "range": {
        "from": "2016-04-15T13:44:39.070Z",
        "to": "2016-04-15T14:44:39.070Z"
      },
      "rangeRaw": {
        "from": "now-1h",
        "to": "now"
      },
      "annotation": {
        "name": "deploy",
        "datasource": "Simple JSON Datasource",
        "iconColor": "rgba(255, 96, 96, 1)",
        "enable": true,
        "query": "#deploy"
      }
    }

  })
  fastify.post('/tag-keys', async function (request, reply) {

    return [
      { "type": "string", "text": "City" },
      { "type": "string", "text": "Country" }
    ]

  })
  fastify.post('/tag-values', async function (request, reply) {

    fastify.log.info("tag values" + JSON.stringify(request.body))
    return [
      { 'text': 'Eins!' },
      { 'text': 'Zwei' },
      { 'text': 'Drei!' }
    ]

  })
}

export default example;
