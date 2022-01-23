const router = require("express").Router();

const MaterialService = require("../services/materialService.js");

// IMPLEMENT CRUD FOR WEAPON
router.get("/:id", async (req, res) => {
  try {
    const material = await MaterialService().getMaterial(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// endpoint created to test material power lvl update
// will change it to patch later
router.patch("/power/:id/:power", async (req, res) => {
  try {
    const { id, power } = req.params;
    const material = await MaterialService().updatePowerLevel(id, power);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
