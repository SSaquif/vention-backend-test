const { accepts } = require("express/lib/request");
const db = require("../config/dbConfig.js");
const table1 = "weapons";
const table2 = "weapon_materials";
const table3 = "materials";
const table4 = "compositions";

class Weapon {
  constructor(payload) {
    this.id = payload.id;
    this.name = payload.name;
    this.power_level = payload.power_level;
    this.qty = payload.qty;
    this.status = payload.status;
  }

  static async findById(id) {
    try {
      let weapon = await db(table1).where("id", id).first();
      return new Weapon(weapon);
    } catch (e) {
      throw new Error("Weapon not found");
    }
  }

  // method to calculate power lvl of weapon based on composition
  static async getPowerLevel(id) {
    try {
      const weaponMaterialsList = await db(table2)
        .select("material_id")
        .where("weapon_id", id);

      if (!weaponMaterialsList.length) {
        throw new Error("Weapon not found");
      }

      // calculating power lvl of each composition tree
      const promises = weaponMaterialsList.map(async (weaponMaterial) => {
        const materialId = weaponMaterial.material_id;
        return await Weapon.compositionPowerLvl(materialId);
      });

      const compositionPowerlvls = await Promise.all(promises);
      // console.log("compositionPowerlvls", compositionPowerlvls);

      // summation to get total power lvl
      return compositionPowerlvls.reduce(
        (acc, compositionPower) => acc + compositionPower,
        0
      );
    } catch (e) {
      throw new Error("Weapon not found");
    }
  }

  // helper function used to calulate power of a single/sub composition tree
  static async compositionPowerLvl(id) {
    try {
      const materialData = await db(table3).where("id", id).first();
      const subMaterialsData = await db(table4).where("parent_id", id);

      if (!subMaterialsData.length) {
        return materialData.power_level;
      } else {
        // recursive call to calulate power of sub tree
        const promises = subMaterialsData.map(async (subMaterial) => {
          const subPowerLvl = await Weapon.compositionPowerLvl(
            subMaterial.material_id
          );
          return subMaterial.qty * subPowerLvl;
        });

        const compositionPowerlvls = await Promise.all(promises);

        return compositionPowerlvls.reduce(
          (acc, compositionPower) => acc + compositionPower,
          materialData.power_level
        );
      }
    } catch (e) {
      throw new Error("Weapon not found");
    }
  }

  static async getMaxBuild(id) {
    try {
      const weaponMaterialsList = await db(table2)
        .select("material_id")
        .where("weapon_id", id);

      if (!weaponMaterialsList.length) {
        throw new Error("Weapon not found");
      }

      const promises = weaponMaterialsList.map(async (weaponMaterial) => {
        const materialId = weaponMaterial.material_id;
        return await Weapon.compositionMaxBuild(materialId);
      });

      const compositionMaxBuilds = await Promise.all(promises);
      // console.log("compositionMaxBuilds", compositionMaxBuilds);

      return Math.min(...compositionMaxBuilds);
    } catch (e) {
      throw new Error("Weapon not found");
    }
  }

  static async compositionMaxBuild(id) {
    const materialData = await db(table3).where("id", id).first();
    const subMaterialsData = await db(table4).where("parent_id", id);

    if (!subMaterialsData.length) {
      return materialData.qty;
    } else {
      //recursive call to calulate quantity of sub tree
      const promises = subMaterialsData.map(async (subMaterial) => {
        const subMaxBuild = await Weapon.compositionMaxBuild(
          subMaterial.material_id
        );

        return subMaxBuild / subMaterial.qty;
      });

      const compositionMaxBuilds = await Promise.all(promises);

      return Math.floor(
        compositionMaxBuilds.reduce(
          (acc, maxBuild) => acc + maxBuild,
          materialData.qty
        )
      );
    }
  }
}

module.exports = Weapon;
