const path = require('path');
// Path to the server file in your dist folder
const server = require('../dist/<PROJECT_NAME>/server/main');
module.exports = server.app();
