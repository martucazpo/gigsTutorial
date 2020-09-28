const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const gigRoutes = require('./routes');
const PORT = process.env.PORT || 3000;
const db = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

db.authenticate()
.then(() => console.log('database connected'))
.catch(err => console.log(err));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
 
app.get('/', (req, res) => res.render('Index', { layout: 'landing' }));
app.use('/gigs', gigRoutes);

app.listen(PORT, console.log(`Server listening on port ${PORT}`));
