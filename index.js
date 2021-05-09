const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', { shortUrl: "", error: "" })
})

// Define Routes
app.use('/', require('./routes/UrlRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));