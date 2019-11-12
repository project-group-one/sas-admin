const { generate } = require('swagger-api-helper');
const path = require('path');
const outputPath = path.join(__dirname, './services');

const urls = [['http://114.116.251.185:9010/v2/api-docs?group=sas-service-api', 'api']];
generate({
  urls,
  outputPath,
}).then(message => {
  console.log(message);
});
