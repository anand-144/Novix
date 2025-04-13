const express = require('express');
const { postANews, getAllNews, getSingleNews, updateNews, deletedNews } = require('./news.controller');
const verifyAdminToken = require('../middleware/verfiyAdminToken');
const router = express.Router();

// Create a news article
router.post("/create-news", verifyAdminToken, postANews);

// Get all news articles
router.get("/", getAllNews);

// Get single news article by id
router.get("/:id", getSingleNews);

// Update a news article by id
router.put("/:id", verifyAdminToken, updateNews);

// Delete a news article by id
router.delete("/:id", verifyAdminToken, deletedNews);

module.exports = router;
