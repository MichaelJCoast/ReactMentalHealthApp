const express = require('express');
const router = express.Router();
const {posts} = require ("../models");



router.get("/", async (req, res)=>{
    const listofposts = await posts.findAll()
    res.json(listofposts);
});

router.post("/", async (req, res)=>{
    const post = req.body;
    await posts.create(post);
    res.json(post);
});



module.exports = router;

