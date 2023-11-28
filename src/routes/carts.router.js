const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json({ status: "ok", data: [] });
});

module.exports = router;
