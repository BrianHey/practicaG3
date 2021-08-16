const express = require('express');
const app = express();
app.listen(3000, console.log('Server up'))
const { get } = require('./controllers/getUsuarios')

app.get('/', get

)