const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const getJS = require('./utils/gist');
const removeComments = require('./utils/parse');

const app = express();
const PORT = 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    getJS((code) => {
        const removed = removeComments(code);
        res.render('index', {
            filename: 'sample.js',
            code: removed
        });
    })
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});



