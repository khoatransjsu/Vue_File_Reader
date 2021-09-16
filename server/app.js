const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'pdf')));

const root = path.join(__dirname, 'pdf');

const readDir = (req, res) => {
    let arr = [];
    let dir = root;

    if(req.query.path != undefined){
        dir += '/'+req.query.path;
    }

    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);

        const fileData = {
            'name': file,
            'isFolder': 1
        };

        if (!fs.lstatSync(fullPath).isDirectory()) {
            fileData.isFolder = 0;
        }
        arr.push(fileData);
    });
    
    res.send(arr)

}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view.html');
});

app.get('/get/directory', readDir);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});

module.exports = app;