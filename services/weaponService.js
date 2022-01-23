const { findById, calculatePowerLvl } = require("../models/weapon");

const WeaponService = () => {
  const getWeaponById = async (id) => {
    return findById(id);
  };

  // endpoint to test powerlvl of weapon
  const getPowerLvl = async (id) => {
    return calculatePowerLvl(id);
  };

  return {
    getWeaponById,
    getPowerLvl,
  };
};

module.exports = WeaponService;
