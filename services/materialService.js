const { find, add, updatePower, updateQty } = require("../models/material");

const MaterialService = () => {
  const getMaterial = async (id) => {
    return find(id);
  };

  // Quest 3
  const updatePowerLevel = async (id, powerLvl) => {
    const numPowerLvl = Number(powerLvl);
    if (isNaN(numPowerLvl)) {
      throw new Error("Power Level must be a Number");
    }
    return updatePower(id, powerLvl);
  };

  // Quest 4
  const updateQuantity = async (id, qty) => {
    const intQty = parseInt(qty);
    if (isNaN(intQty)) {
      throw new Error("Quantity must be an Integer");
    } else if (intQty < 0) {
      throw new Error("Quantity can not be negative");
    } else {
      return updateQty(id, qty);
    }
  };

  // Quest 4
  const createMaterial = async (powerLvl, qty) => {
    if (qty < 0) {
      throw new Error("Quantity can not be negative");
    } else {
      return add(powerLvl, qty);
    }
  };

  return {
    getMaterial,
    createMaterial,
    updatePowerLevel,
    updateQuantity,
  };
};

module.exports = MaterialService;
