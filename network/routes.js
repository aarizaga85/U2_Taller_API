const representante = require('../api/representante/interface')
const empresa = require('../api/empresa/interface')

const routes = function(server) {
    server.use('/representante', representante)
    server.use('/empresa', empresa)
}

module.exports = routes