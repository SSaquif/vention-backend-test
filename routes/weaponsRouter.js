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

// Quest 2
// endpoint to test power_lvl calculation of weapon
router.get("/power/:id", async (req, res) => {
  try {
    const weaponPowerLvl = await WeaponService().getPowerLvl(req.params.id);
    res.status(200).json({ id: req.params.id, power_level: weaponPowerLvl });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/max-buildable/:id", async (req, res) => {
  try {
    const maxBuildable = await WeaponService().getMaxBuildable(req.params.id);
    res.status(200).json({ id: req.params.id, max_buildable: maxBuildable });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
