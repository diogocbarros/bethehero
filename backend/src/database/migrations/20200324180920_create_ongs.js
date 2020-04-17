
exports.up = function(knex) {
   return knex.schema.hasTable('ongs').then(function(exists) {
      if (!exists) {
         return knex.schema.createTable('ongs', function(t) {
            t.string('id').primary();
            t.string('name', 100).notNullable();
            t.string('email', 100).notNullable();
            t.string('whatsapp').notNullable();
            t.string('city').notNullable();
            t.string('uf',2).notNullable();
         });
      }
   });
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('ongs');
};
