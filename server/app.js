const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'pdf')));

const root = path.join(__dirname, 'pdf');

const readDir = (req, res) =>{ 
    let path = root;

    if(req.query.path != undefined){
        path += req.query.path;
    }
    
    let arr = []

    let pdf = 0, dir = 0;

    fs.readdir(path, { withFileTypes: true }, (err, files) => {

        if(err) {
            res.send("Directory not found");
        }

        files.forEach(file => {
            const fileData = {'name': file.name, 'isDirectory': file.isDirectory()};

            if(file.isDirectory()) {
                arr.splice(dir, 0, fileData)
                dir ++;
            } else {
                arr.splice(dir + pdf, 0, fileData);
                pdf ++;
            }
        });

        res.send({
            'data': arr,
            'pdfCount': pdf
        });
       

    });
}

function traverseDir(dir) {
    let count = 0;
    fs.readdirSync(dir).forEach(file => {
      let fullPath = path.join(dir, file);
      const fileData = {
        'name': file,
        'location': fullPath 
        };
      if (fs.lstatSync(fullPath).isDirectory()) {      
            traverseDir(fullPath);
       } else {
            count++;
            console.log(fileData);
            count = 0;
       }  
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