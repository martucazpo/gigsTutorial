const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const gigRoutes = require('./routes');
const PORT = process.env.PORT || 3000;
const db = require('./config/database');


db.authenticate()
.then(() => console.log('database connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Index'));
app.use('/gigs', gigRoutes);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
