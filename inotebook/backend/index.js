const mongoConnect = require('./database/db')
const express = require('express');
const port = 5000;
const cors = require('cors')

mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/user'));

app.listen(port, ()=>{
    console.log(`Listning at http://localhost:${port}`);
});