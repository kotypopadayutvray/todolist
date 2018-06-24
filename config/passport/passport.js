var bCrypt = require('bcrypt');

module.exports = function(passport, userModel) {
  let User = userModel;
  let LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if(user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, login, password, done) {
      let userData = {
        login: login,
        email: req.body.email,
        password: generateHash(password)
      };
      console.log('Try create a user');
      User.create(userData).then(user => {
        console.log('User created');
        return done(null, user);
      }).catch(errors => {
        console.log('User not created');
        console.log(errors);
        return done(null, false, errors);
      });
    }
  ));

  passport.use('local-signin', new LocalStrategy(
    {
      usernameField: 'login',
      passwordField: 'password',
      passReqToCallback: true
    }, function(req, login, password, done) {
      User.find({
        where: {
          login: login
        }
      }).then(user => {
        if (user) {
          if (isValidPassword(password, user.password)) {
            return done(null, user);
          }
          return done(null, false, { error: 'Invalid password' });
        }
        return done(null, false, { error: `Can't find user with login ${login}` });
      }).catch(errors => {
        console.log(errors);
        return done(errors, false, errors);
      });
    }
  ));
};

function generateHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
}

function isValidPassword(formPassword, userPassword) {
  return bCrypt.compareSync(formPassword, userPassword);
};