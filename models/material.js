const { default: knex } = require("knex");
const db = require("../config/dbConfig.js");
const { getPowerLevel } = require("../models/weapon");

const table1 = "weapons";
const table2 = "weapon_materials";
const table3 = "materials";
const table4 = "compositions";

class Material {
  constructor(payload) {
    this.id = payload.id;
    this.power_level = payload.power_level;
    this.qty = payload.qty;
    this.deleted_at = payload.deleted_at;
  }

  static async find(id) {
    try {
      let material = await db(table3).where("id", id).first();
      return new Material(material);
    } catch (err) {
      throw new Error("Material not found");
    }
  }

  // Quest 4
  static async add(pwerLvl, qty) {
    try {
      let insert = await db(table3).insert({
        power_level: pwerLvl,
        qty,
      });
      console.log("insert", insert);
      return { success: true, insertCount: insert.rowCount };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  // Quest 3
  // update material powerLvl
  static async updatePower(id, powerLvl) {
    try {
      let updatedMaterialRows = await db(table3)
        .where("id", id)
        .update("power_level", powerLvl);

      if (!updatedMaterialRows) {
        throw new Error("Material not found");
      } else {
        let associatedWeapons = await db(table2).where("material_id", id);

        const promises = associatedWeapons.map(async (weapon) => {
          const newWeaponPower = await getPowerLevel(weapon.weapon_id);
          console.log("newWeaponPower", newWeaponPower);
          return await db(table1)
            .where("id", weapon.weapon_id)
            .update("power_level", newWeaponPower);
        });

        const individualUpdatedWeaponRows = await Promise.all(promises);

        const updatedWeaponRows = individualUpdatedWeaponRows.reduce(
          (acc, updateCount) => acc + updateCount,
          0
        );

        return {
          success: true,
          updatedMaterialRows,
          updatedWeaponRows,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  // Quest 4
  static async updateQty(id, qty) {
    try {
      let updatedMaterialRows = await db(table3)
        .where("id", id)
        .update("qty", qty);

      if (!updatedMaterialRows) {
        throw new Error("Material not found");
      } else {
        return {
          success: true,
          updatedMaterialRows,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  // Quest 4
  static async deleteMaterial(id) {
    console.log("here");
    try {
      let updatedMaterialRows = await db(table3)
        .where("id", id)
        .update({ deleted_at: "now" });

      console.log(updatedMaterialRows);
      if (!updatedMaterialRows) {
        throw new Error("Material not found");
      } else {
        let associatedWeapons = await db(table2).where("material_id", id);

        const promises = associatedWeapons.map(async (weapon) => {
          // const newWeaponPower = await getPowerLevel(weapon.weapon_id);
          // console.log("newWeaponPower", newWeaponPower);
          return await db(table1)
            .where("id", weapon.weapon_id)
            .update("status", "broken");
        });

        const individualUpdatedWeaponRows = await Promise.all(promises);

        const updatedWeaponRows = individualUpdatedWeaponRows.reduce(
          (acc, updateCount) => acc + updateCount,
          0
        );

        return {
          success: true,
          updatedMaterialRows,
          updatedWeaponRows,
        };
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Material;
