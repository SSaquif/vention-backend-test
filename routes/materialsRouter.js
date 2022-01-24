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

// Quest 4
// create a new material
router.post("/", async (req, res) => {
  try {
    const { power, qty } = req.body;
    const response = await MaterialService().createMaterial(power, qty);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 3
// endpoint to update material power lvl
router.patch("/power/:id/:power", async (req, res) => {
  try {
    const { id, power } = req.params;
    const response = await MaterialService().updatePowerLevel(id, power);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 4
// endpoint to update material quantity
router.patch("/quantity/:id/:qty", async (req, res) => {
  try {
    const { id, qty } = req.params;
    const response = await MaterialService().updateQuantity(id, qty);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Quest 4
// endpoint to delete material by id
router.delete("/:id", async (req, res) => {
  try {
    const response = await MaterialService().deleteMaterialById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
