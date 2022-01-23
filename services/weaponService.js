const { findById, getPowerLevel } = require("../models/weapon");

const WeaponService = () => {
  const getWeaponById = async (id) => {
    return findById(id);
  };

  const getPowerLvl = async (id) => {
    return getPowerLevel(id);
  };

  return {
    getWeaponById,
    getPowerLvl,
  };
};

module.exports = WeaponService;
