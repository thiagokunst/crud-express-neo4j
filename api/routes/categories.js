var express = require("express");
var router = express.Router();
var categoriesModel = require("../models/categories");

//  Get categories list.
router.get("/", async function (req, res, next) {
    // res.json("teste");
    try {
        let data = await categoriesModel.getAllCategories();
        res.json(data);
    } catch (e) {
        console.error(e);
    }
 
});

// Get specific category by id
router.get("/:id", async function (req, res, next) {
    try{
        let data = await categoriesModel.getCategoryById(req.params.id);
        res.json(data);
    }catch(e){
        console.error(e);
    }
    
});

// Update category by id
router.put("/:id", async function (req, res, next) {
    try{
        let data = categoriesModel.updateCategory(req.params.id, req.body);
        res.json(data);
    }catch(e){
        console.error(e);
    }
    
});

// Insert category
router.post("/", async function (req, res, next) {
    try{
        let data = await categoriesModel.insertCategory(req.body);
        res.json(data);
    }catch(e){
        console.error(e);
    }
    
});

// Delete category by id
router.delete("/:id", async function (req, res, next) {
    try{
        let data = categoriesModel.deleteCategoryById(req.params.id);
        res.json(data);
    }catch(e){
        console.error(e);
    }
    
});

module.exports = router;
