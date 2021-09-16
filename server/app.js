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
    fs.readdirSync(dir).forEach(file => {
      let fullPath = path.join(dir, file);
      const fileData = {
        'name': file,
        'location': fullPath 
        };
       isPdf = false;
      if (fs.lstatSync(fullPath).isDirectory()) {            
            fileData['isPdf'] = false;
            arr.push(fileData);   
            //traverseDir(fullPath);     
        } else { 
            fileData['isPdf'] = true;
            arr.push(fileData);
       }       
    });
}

const readDir = (req,res) =>{ 

    traverseDir(__dirname + '/pdf/');

    res.send({
        arr
    })

}

app.get('/', (req, res)=>{
    res.send("Server Ok!")
});

app.get('/readFiles', readDir);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log(`Server running on Port ${PORT}`);
});

module.exports = app;