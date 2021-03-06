var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.cookies['x-auth'];

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).redirect('/');
  });
};

var admin = (req, res, next) => {
  var token = req.cookies['x-auth'];

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }
    if(!user.administration) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).redirect('/list');
  });
};

var editor = (req, res, next) => {
  var token = req.cookies['x-auth'];

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    if(!user.editor) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).redirect('/list');
  });
};

var getUser = (req, res, next) => {
  var token = req.cookies['x-auth'];

  if(!token) {
    return next();
  }

  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    console.log('errored');
    res.send();
  });
};

module.exports = {authenticate, getUser, admin, editor};
