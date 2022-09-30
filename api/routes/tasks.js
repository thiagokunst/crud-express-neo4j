var express = require("express");
var router = express.Router();

//  Get tasks list.
router.get("/", function (req, res, next) {
  res.send("get");
});

// Update task by id
router.put("/:id", function (req, res, next) {
  res.json({
    message: `id: ${req.params.id}`,
  });
});

// Insert task
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Delete task by id
router.delete("/:id", function (req, res, next) {
  res.json({
    message: `id: ${req.params.id}`,
  });
});

module.exports = router;
