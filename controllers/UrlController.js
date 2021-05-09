const Url = require("../models/Url");
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

// save shortened Url
exports.saveShortUrl = async (req, res) => {
    const { longUrl } = req.body;

    const baseUrl = config.get('baseUrl');

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.render('index', { shortUrl: "", error: "Invalid Long url" });
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            
            // if url already present
            if (url) {
                // return the existing short url
                res.render('index', { shortUrl: url.shortUrl, error: "" })
            } else {
                // if not add the code to the base url and save
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                res.render('index', { shortUrl: url.shortUrl, error: "" })
            }
        } catch (err) {
            console.error(err);
            res.render('index', { shortUrl: "", error: "Server Error" })
        }
    } else {
        res.render('index', { shortUrl: "", error: "Invalid url" })
    }

};

// Get Url
exports.getUrl = async (req, res) => {
    try {
        // finding the url with the code
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            // if found redirect with the original code
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};