const config = require('../knexfile.js')
const knex = require('knex')(config)

// executa as migrates, não é indicado
//knex.migrate.latest([config])

module.exports = knex