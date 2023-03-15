const Users = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const response = require('../util/responseHandler');
const { unlink } = require('fs');

const getAll = async (req, res) => {
  try {
    const allUsers = await Users.find();
    // .populate('recipes')
    response(res, 201, 'All users', { allUsers });
  } catch (err) {
    response(res, 500, err.msg);
  }
};

const getOneById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id).populate('recipes');
    //
    if (!user) {
      response(res, 404, `User not found`);
    } else {
      response(res, 201, `User with ID#${req.params.id} fetched`, { user });
    }
  } catch (err) {
    response(res, 404, "Doesn't exist");
  }
};

const register = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      return response(
        res,
        400,
        'Bad request. User exists with the provided email.'
      );
    }

    req.body.password = bcrypt.hashSync(req.body.password);

    user = await Users.create(req.body);

    response(res, 201, 'New user has been created', { user });
  } catch (error) {
    response(res, 500, error.msg);
  }
};
const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const payload = {
          id: user._id,
          email: user.email,
          first_name: user.firstName,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: '10d',
        });

        response(res, 200, 'You have logged in successfully', {
          token,
          id: user._id,
        });
      } else {
        response(res, 401, 'Invalid credentials');
      }
    } else {
      response(res, 401, 'Invalid credentials');
    }
  } catch (error) {
    response(res, 500, error.msg);
  }
};

const update = async (req, res) => {
  try {
    console.log(req.body);
    const user = await Users.findById(req.params.id);
    const oldImgFilename = user.image.split('/');

    if (
      bcrypt.compareSync(req.body.password, user.password) ||
      req.body.password === ''
    ) {
      req.body.password = user.password;
    } else {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    if (req.file) {
      unlink(
        `public/images/${oldImgFilename[oldImgFilename.length - 1]}`,
        () => {
          console.log('Old image was deleted');
        }
      );
      req.body.image = `${proccess.env.SERVER_URL}/images/${req.file.filename}`;
    } else {
      req.body.image = user.image;
    }

    await Users.findByIdAndUpdate(req.params.id, req.body);
    res.send(`User with ID#${req.params.id} has been updated`);
  } catch (err) {
    console.log(err);
    res.status(400).send('Something went wrong');
  }
};

const destroy = async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);

  res.send(`User with ID#${req.params.id} has been removed`);
};

module.exports = {
  getAll,
  register,
  login,
  update,
  destroy,
  getOneById,
};
