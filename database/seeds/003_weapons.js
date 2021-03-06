exports.seed = function (knex) {
  return knex("weapons")
    .del()
    .then(function () {
      return knex("weapons").insert([
        {
          // id: 1,
          name: "Excalibur",
          power_level: 20630,
          qty: 1,
          status: "new",
        },
        {
          // id: 2,
          name: "Magic Staff",
          power_level: 3250,
          qty: 1,
          status: "new",
        },
        {
          // id: 3,
          name: "Axe",
          power_level: 12040,
          qty: 1,
          status: "new",
        },
      ]);
    });
};
