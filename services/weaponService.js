const { findById, getPowerLevel, getMaxBuild } = require("../models/weapon");

const WeaponService = () => {
  const getWeaponById = async (id) => {
    return findById(id);
  };

  const getPowerLvl = async (id) => {
    return getPowerLevel(id);
  };

  const getMaxBuildable = async (id) => {
    return getMaxBuild(id);
  };

  return {
    getWeaponById,
    getPowerLvl,
    getMaxBuildable,
  };
};

module.exports = WeaponService;
