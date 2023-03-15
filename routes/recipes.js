const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const controller = require('../controllers/recipes.controller');
const response = require('../util/responseHandler');
const upload = require('../util/multer');

require('dotenv').config();

router.use(
  jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }).unless({
    path: [
      {
        url: '/recipes',
        methods: ['GET'],
      },
      {
        url: /^\/recipes\/.*/,
        methods: ['GET'],
      },
    ],
  })
);

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    response(res, 401, 'Unauthorized access');
  }
});

router
  .get('/', controller.getAll)
  .get('/breakfast', controller.getBreakfastRecipes)
  .get('/brunch', controller.getBrunchRecipes)
  .get('/lunch', controller.getLunchRecipes)
  .get('/dinner', controller.getDinnerRecipes)
  .get('/new', controller.newRecipes)
  .get('/popular', controller.popularRecipes)
  .patch('/:recipeId', upload.single('recipeImg'), controller.edit)
  .get('/:recipeId', controller.getOneById)
  .post('/likes', controller.likes)
  .post('/:id', upload.single('recipeImg'), controller.create)
  .delete('/:id', controller.destroy);

module.exports = router;
