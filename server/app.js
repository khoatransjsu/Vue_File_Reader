const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'pdf')));

const root = path.join(__dirname, 'pdf');

let arr = []

function traverseDir(dir) {
    let count = 0;
    fs.readdirSync(dir).forEach(file => {
      let fullPath = path.join(dir, file);
      const fileData = {
        'name': file,
        'location': fullPath 
        };
      if (fs.lstatSync(fullPath).isDirectory()) {      
            arr.push(fileData);
            traverseDir(fullPath);
       } else { 
            count++;
            console.log(fileData);
            count = 0;
       }  
    });
}


const readDir = (req,res) =>{ 
    let dir = root;

    if(req.query.path != undefined){
        dir += req.query.path;
    }
    
    traverseDir(dir);

    res.send({
        arr
    })

}

app.get('/', (req, res)=>{
    res.send("Server Ok!")
});

app.get('/readFiles', readDir);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log( `Server running on Port ${PORT}`);
});

module.exports = app;