const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

const root = path.join(__dirname, 'pdf');

const readDir = function (req, res) {
   
    let path = root;

    if(req.query.path!=undefined){
        path +=req.query.path;
    }
    
    let arr = []
    let pdfCount = 0, dirCount = 0;

    fs.readdir(path, { withFileTypes: true }, (err, files) => {

        if(err) {
            res.send({
                'message': 'error', 
                'data': 'Error reading directory: ' + path
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
            'message': 'success',
            'data': arr,
            'pdfCount': pdfCount
        });

    });

}

app.get('/readFiles', readDir);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log( `Server running on Port ${PORT}`);
});

module.exports = app;