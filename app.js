const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:



hbs.registerPartials(__dirname + "/views/partials")
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
    //   console.log(beersFromApi)
      res.render('beers.hbs', { beersFromApi });
    })

    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
    //   console.log("este es"+beersFromApi)
      res.render('random-beer.hbs', { beersFromApi });
    })

    .catch(error => console.log(error));
});

app.get("/beers/:id", (req, res) => {  
  // console.log(req.params.id)
  punkAPI.getBeer(req.params.id)
.then( (beersFromApi)=> {
  res.render('oneBeer.hbs', {  beersFromApi })
 
})



})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
