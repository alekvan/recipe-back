const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const controller = require('../controllers/users.controller');
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
        url: '/users/login',
        methods: ['POST'],
      },
      {
        url: '/users/register',
        methods: ['POST'],
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
  .get('/:id', controller.getOneById)
  .post('/login', controller.login)
  .post('/register', controller.register)
  .patch('/:id', upload.single('image'), controller.update)
  .delete('/:id', controller.destroy);

module.exports = router;
