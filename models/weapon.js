const db = require("../config/dbConfig.js");
const table = "weapons";

class Weapon {
  constructor(payload) {
    // TO BE IMPLEMENTED
    this.id = payload.id;
    this.name = payload.name;
    this.power_level = payload.power_level;
    this.qty = payload.qty;
    this.status = payload.status;
  }

  // TO BE IMPLEMENTED
  getPowerLevel() {}
}

module.exports = Weapon;
