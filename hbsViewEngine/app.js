const express = require('express');
const app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('toUpper', (text) => {
   return text.toUpperCase();
});
app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.listen(3000, (err) => {
   if(err){
       console.log(err);
   } else {
       console.log('Server is starting !!!!');
   }
});

/**
 Note run app by command: nodemon app.js -e js,hbs to support hbs
 **/
