const { find, updatePower } = require("../models/material");

const MaterialService = () => {
  const getMaterial = async (id) => {
    return find(id);
  };

  const updatePowerLevel = async (id, powerLvl) => {
    return updatePower(id, powerLvl);
  };

  return {
    getMaterial,
    updatePowerLevel,
  };
};

module.exports = MaterialService;
