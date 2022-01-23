const router = require("express").Router();

const MaterialService = require("../services/materialService.js");

// IMPLEMENT CRUD FOR MATERIAL
router.get("/:id", async (req, res) => {
  try {
    const material = await MaterialService().getMaterial(req.params.id);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 3
// endpoint to update material power lvl
router.patch("/power/:id/:power", async (req, res) => {
  try {
    const { id, power } = req.params;
    const material = await MaterialService().updatePowerLevel(id, power);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 4
// endpoint to update material quantity
router.patch("/quantity/:id/:qty", async (req, res) => {
  try {
    const { id, qty } = req.params;
    const material = await MaterialService().updateQuantity(id, qty);
    res.status(200).json(material);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 4
// create a new material
router.post("/material", async (req, res) => {
  try {
    const { power_lvl, qty } = req.body;
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
