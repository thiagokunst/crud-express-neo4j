var express = require("express");
var router = express.Router();
var tasksModel = require("../models/tasks");

//  Get tasks list.
router.get("/", async function (req, res, next) {
    // res.json("teste");
    let data = await tasksModel.getAllTasks();
    res.json(data);
});

// Get specific task by id
router.get("/:id", async function (req, res, next) {
    // res.json("teste");
    let data = await tasksModel.getTaskById(req.params.id);
    res.json(data);
});

// Update task name by id
router.patch("/:id", async function (req, res, next) {
    let data = await tasksModel.updateTask(req.params.id, req.body);
    res.json(data);
});

// Update task category by id
router.post("/update_category", async function (req, res, next) {
    let data = await tasksModel.updateCategory(req.body);
    res.json(data);
});

// Delete task category by id
router.post("/delete_category", async function (req, res, next) {
    let data = await tasksModel.deleteCategory(req.body);
    res.json(data);
});

// Insert task
router.post("/", async function (req, res, next) {
    let data = await tasksModel.insertTask(req.body);
    res.json(data);
});

// Delete task by id
router.delete("/:id", async function (req, res, next) {
    let data = tasksModel.deleteTaskById(req.params.id);
    res.json(data);
});

module.exports = router;
