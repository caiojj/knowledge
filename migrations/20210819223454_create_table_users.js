
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('imageUrl', 1000)
        table.bigInteger('followers').notNull().defaultTo(0)
        table.bigInteger('following').notNull().defaultTo(0)
        table.string('nameUser').unique().notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};