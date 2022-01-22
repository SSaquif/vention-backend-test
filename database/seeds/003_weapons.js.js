exports.seed = function (knex) {
  return knex("weapons")
    .del()
    .then(function () {
      return knex("weapons").insert([
        {
          id: 1,
          name: "Excalibur",
          power_level: 20930, // placeholder value
          qty: 1,
          status: "new",
        },
        {
          id: 2,
          name: "Magic Staff", //placehoder value
          power_level: 3250,
          qty: 1,
          status: "new",
        },
      ]);
    });
};
