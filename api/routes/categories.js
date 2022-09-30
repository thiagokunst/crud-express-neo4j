var express = require("express");
var router = express.Router();

//  Get categories list.
router.get("/", function (req, res, next) {
  res.send("get");
});

// Update category by id
router.put("/:id", function (req, res, next) {
  res.json({
    message: `id: ${req.params.id}`,
  });
});

// Insert category
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Delete category by id
router.delete("/:id", function (req, res, next) {
  res.json({
    message: `id: ${req.params.id}`,
  });
});

module.exports = router;
