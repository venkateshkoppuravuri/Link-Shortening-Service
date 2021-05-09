const express = require("express");

const {
    getUrl,
    saveShortUrl
} = require("../controllers/UrlController");

const router = express.Router();

// Save Short Url Route
router.route("/saveShortUrl").post(saveShortUrl);

// get Long Url Route
router.route("/:code").get(getUrl);

module.exports = router;