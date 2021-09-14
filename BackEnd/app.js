const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { console.log( `Server running on Port ${PORT}`);
});

module.exports = app;