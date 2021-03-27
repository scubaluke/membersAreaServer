const express = require('express')
const path = require('path')
const moment = require('moment');
const exphbs = require('express-handlebars');
const members = require('./Members')


const app = express() 
const PORT = process.env.PORT || 5000

// handalbars middlewear
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


//middlewear
function logger(req, res, next) {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next()
}
// body parser middlewear
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// init middlewear
// app.use(logger)
// homepage route
app.get('/', (req, res) => res.render('index', { 
    title: 'members page',
    members
}))
app.use('/api/members', require('./routes/api/members'))


// set static  folder 
app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, () => console.log(`running on port: ${PORT}`))