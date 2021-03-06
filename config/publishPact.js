const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../pacts')],
  pactBroker: 'http://localhost',
  tags: ['test'],
  consumerVersion: '1.0.0'
}

pact.publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
})