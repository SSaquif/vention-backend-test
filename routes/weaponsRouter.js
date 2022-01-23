const router = require("express").Router();

const WeaponService = require("../services/weaponService.js");

router.get("/:id", async (req, res) => {
  try {
    const weapon = await WeaponService().getWeaponById(req.params.id);
    res.status(200).json(weapon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/power/:id", async (req, res) => {
  try {
    const weapon = await WeaponService().getPowerLvl(req.params.id);
    res.status(200).json(weapon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
