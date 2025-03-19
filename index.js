const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const randInt = n => Math.floor(n * Math.random()); 


const getRandomItemFromArray = arr => arr[randInt(arr.length)]; 

app.use(express.static('public'));

const dogBreeds = {
  bulldog: ['bulldog1.jpg', 'bulldog2.jpg'],
  poodle: ['poodle1.jpg', 'poodle2.jpg'],
  golden: ['golden1.jpg', 'golden2.jpg'],

  husky: ['husky1.jpg', 'husky2.jpg']
};

app.get('/breeds', (req, res) => {
  res.json({
    status: 'success',
    message: Object.keys(dogBreeds)
  });
});

app.get('/image/:breed', (req, res) => {

  const breed = req.params.breed.toLowerCase();
  
  if (dogBreeds[breed]) {
    const randomImage = getRandomItemFromArray(dogBreeds[breed]);
    res.json({
      status: 'success',
      message: `/img/${randomImage}`
    });
  } else {
    res.status(404).json({
      status: 'error',
      
      message: 'Breed not found'
    });
  }
});

// Start the server
app.listen(PORT, () => {

  console.log(`Server running at http://localhost:${PORT}`);
});