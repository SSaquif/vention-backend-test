// The weapon_materials table represnts a joining/junction table
exports.up = async function (knex) {
  await knex.schema.createTable("weapon_materials", function (t) {
    t.integer("weapon_id").index().references("id").inTable("weapons");
    t.integer("material_id").index().references("id").inTable("materials");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("weapon_materials");
};
