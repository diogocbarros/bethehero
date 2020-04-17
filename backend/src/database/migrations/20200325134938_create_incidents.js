
exports.up = function(knex) {
   return knex.schema.hasTable('incidents').then(function(exists) {
      if (!exists) {
         return knex.schema.createTable('incidents', function(t) {
            t.increments();
            t.string('title').notNullable();
            t.string('description').notNullable();
            t.decimal('value').notNullable();
            
            t.string('ong_id').notNullable();
            
            // Cria chave primaria
            t.foreign('ong_id').references('id').inTable('ongs');
         });
      }
   });
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('incidents');
};
