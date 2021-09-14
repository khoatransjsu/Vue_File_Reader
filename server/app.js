const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'pdf')));

const root = path.join(__dirname, 'pdf');

const readDir = function (req, res) { 
    let path = root;

    if(req.query.path != undefined){
        path += req.query.path;
    }
    
    let arr = []

    let pdfCount = 0, dirCount = 0;

    fs.readdir(path, { withFileTypes: true }, (err, files) => {

        if(err) {
            res.send({
                'data': 'Unable to read directory: ' + path
            });
        }

        files.forEach(file => {
            const fileData = {'name': file.name, 'isDirectory': file.isDirectory()};

            if(file.isDirectory()) {
                arr.splice(dirCount, 0, fileData)
                dirCount ++;
            } else {
                arr.splice(dirCount + pdfCount, 0, fileData);
                pdfCount ++;
            }
        });

        res.send({
            'data': arr,
            'pdfCount': pdfCount
        });

    });

}

app.get('/', (req, res)=>{
    res.send("Server Ok!")
});

app.get('/readFiles', readDir);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log( `Server running on Port ${PORT}`);
});

module.exports = app;